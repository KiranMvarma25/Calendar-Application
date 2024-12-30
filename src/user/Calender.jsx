import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";
import { logCommunication } from "../redux/slices/adminSlice";


function CalendarView(){
  const dispatch = useDispatch();
  const companyData = useSelector(state => state.admin.companyData); 
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null); 
  const [newCommunication, setNewCommunication] = useState({ date : "", type : "" });

  console.log(companyData);
  
  const formatCommunications = (companyData) => {

    const events = [];

    companyData.forEach(company => {

      const { nextCommunication, communications: pastComms } = company;

      if(pastComms){
        pastComms.forEach(comm => {
          const commDate = dayjs(comm.date).format('YYYY-MM-DD');
          events.push({
            title : `${company.name} - ${comm.type} - ${comm.comment || ""}`,
            date : commDate,
            color : "#FF9F00",
            description : `Past Communication - ${comm.type} on ${commDate}`,
            past : true,
            companyName : company.name,
          });
        });
      } 
      
      else 
        console.log("No Communications Yet");
      

      if(nextCommunication && nextCommunication.date){
        const nextCommDate = dayjs(nextCommunication.date).format('YYYY-MM-DD');
        events.push({
          title : ` - ${company.name} - ${nextCommunication.type}`,
          date : nextCommDate,
          color : "#28A745",
          description : `Upcoming Communication - ${nextCommunication.type} scheduled for ${nextCommDate}`,
          past : false,
          companyName : company.name, 
        });
      }

    });

    return events;

  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event); 
    setSelectedCompany(info.event.extendedProps.companyName); 
  };

  const handleDateClick = (info) => {
    alert(`Clicked on date: ${info.dateStr}`);
  };

  const handleAddCommunication = () => {

    if(newCommunication.date && newCommunication.type && selectedCompany){
      const communication = {
        type : newCommunication.type,
        date : newCommunication.date,
        comment : "No comments", 
      };
      dispatch(logCommunication({ companyName: selectedCompany, communication }));
      setNewCommunication({ date : "", type : "" }); 
    } 
    
    else 
      alert("Please select a valid date, communication type, and company.");
    
  };

  return (
    <div className="calendarParent">

      <div className="calendar">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={formatCommunications(companyData)}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          editable={true}
          droppable={true}
        />
      </div>

      <div>

        <div className="addCommunication">
          
          <h4>Add Communication</h4>

          <select className="inputSelect" value={selectedCompany || ""} onChange={(e) => setSelectedCompany(e.target.value)}>

            <option value="">Select Company</option>
            {companyData.map((company, index) => 
              <option key={index} value={company.name}>{company.name}</option>
            )}

          </select>

          <input className="inputDate" type="date" value={newCommunication.date} onChange={(e) => setNewCommunication({ ...newCommunication, date : e.target.value })} />

          <select value={newCommunication.type} onChange={(e) => setNewCommunication({ ...newCommunication, type : e.target.value }) }>
            <option value="">Select Communication Type</option>

            {companyData[0].communications.map((comm, index) => 
              <option key={index} value={comm.type}>{comm.type}</option>
            )}
            
          </select>

          <br />
          <br />

          <button className="addCommunicationButton" onClick={handleAddCommunication}>Add Communication</button>
        </div>

        <div>
          {selectedEvent && (
            <div className="eventDetails">
              <h4>Event Details -</h4>
              <p><strong>Title :</strong> {selectedEvent.title}</p>
              <p><strong>Description :</strong> {selectedEvent.extendedProps.description}</p>
              <p><strong>Start Date :</strong> {selectedEvent.start.toISOString().split("T")[0]}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default CalendarView;