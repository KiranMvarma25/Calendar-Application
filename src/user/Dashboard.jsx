import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { Tooltip } from 'react-tooltip'; 
import Notifications from './Notifications';
import { logCommunication } from '../redux/slices/adminSlice';
import { toast } from 'react-toastify';

Modal.setAppElement('#root'); 

function Dashboard() {

    const companyData = useSelector(state => state.admin.companyData);
    // console.log(companyData)

    const [highlightedCompanies, setHighlightedCompanies] = useState({});       // Local state to manage selected companies, highlighted companies and modal open state
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [communicationDetails, setCommunicationDetails] = useState({          // Communication details in the form
        type : '',
        date : '',
        comment : '',
    });
    const dispatch = useDispatch();

    const toggleCompanySelection = (companyName) => {                           // Function to toggle the selection of a company
        setSelectedCompanies(prev =>
            prev.includes(companyName) ? prev.filter(name => name !== companyName) : [...prev, companyName]
        );
    };

    const getHighlight = (nextCommunicationDate, companyId) => {                // Function to get highlight color for a company's next communication date

        if(highlightedCompanies[companyId] === false) 
            return ''; 

        const today = new Date();
        const nextDate = new Date(nextCommunicationDate);

        today.setHours(0, 0, 0, 0);
        nextDate.setHours(0, 0, 0, 0);

        if(nextDate < today)
             return 'red'; 
        
        else if(nextDate.toDateString() === today.toDateString()) 
            return 'yellow'; 

        return ''; 
    };


    const toggleHighlight = (companyId) => {
        setHighlightedCompanies(prevState => ({
            ...prevState,
            [companyId] : !prevState[companyId],
        }));
    };

    
    const handleSubmitCommunication = () => {

        if(!communicationDetails.type || !communicationDetails.date){
            // alert('Please fill in all required fields!');
            toast.info("Please fill in all required fields!");
            return;
        }

        
        selectedCompanies.forEach(company => {
            dispatch(logCommunication({
                companyName : company,
                communication : {
                    type : communicationDetails.type,
                    date : communicationDetails.date,
                    comment : communicationDetails.comment, 
                },
            }));

            
            setHighlightedCompanies(prevState => ({
                ...prevState,
                [company] : false,
            }));

        });

        
        setIsModalOpen(false);                                                  // Closing the modal and reset the state
        setSelectedCompanies([]);
        setCommunicationDetails({ type : '', date : '', comment : '' }); 
        toast.success("Communication Performed Successfully");
    };

    return (
        <div className='meetingsandnotifications'>
            
            <div className='meetings'>

                <button onClick={() => setIsModalOpen(true)} disabled={selectedCompanies.length === 0} style={{ margin: '10px 0', padding: '10px', borderRadius: "5px", backgroundColor: selectedCompanies.length === 0 ? '#ccc' : '#007bff', color: '#fff', cursor: 'pointer' }}>Communication Performed</button>
                
                <div className='tableContainer'>
                <table border="3" className="table3">
                    
                    <thead align="center">
                        <tr align="center" className="thead3">
                            <th className="trInthead">Select</th>
                            <th className="trInthead">Company Name</th>
                            <th className="trInthead">Last Five Communications</th>
                            <th className="trInthead">Next Scheduled Communication</th>
                        </tr>
                    </thead>

                    <tbody className="tbody3">

                        {companyData.map((company, index) => (

                            <tr key={index} style={{ backgroundColor: getHighlight(company.nextCommunication?.date, company.name), }} >
                                
                                <td align="center">
                                    <input type="checkbox" checked={selectedCompanies.includes(company.name)} onChange={() => toggleCompanySelection(company.name)} />
                                </td>

                                <td align="center">{company.name}</td>

                                <td>
                                    {company.communications && company.communications.length > 0 ? (
                                        company.communications.slice(-5).map((comm, i) => (
                                        <div key={i} className="communication-item" data-tip={comm.comment || 'No comments'}>
                                            <strong>{comm.type}</strong> - {comm.date}
                                            <Tooltip />
                                        </div>
                                        ))
                                    ) : (
                                        <p>No communications yet</p>
                                    )}
                                </td>

                                <td align="center">
                                    {company.nextCommunication && (
                                        <div>
                                            {company.nextCommunication.type} - {company.nextCommunication.date}
                                        </div>
                                    )}
                                    <button onClick={() => toggleHighlight(company.name)} style={{ marginTop: '5px', padding: '5px', backgroundColor: highlightedCompanies[company.name] === false ? '#ccc' : '#007bff', color: '#fff', border: 'none', cursor: 'pointer'}} >
                                        {highlightedCompanies[company.name] === false ? 'Enable Highlight' : 'Disable Highlight'}
                                    </button>
                                </td>

                            </tr>

                        ))}
                    </tbody>

                </table>
                </div>

                <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} contentLabel="Log Communication" className="modal" overlayClassName="overlay">
                    
                    <h2>Log Communication</h2>
                    
                    <form>

                        <div>
                            <label>Type of Communication:</label>
                            <select value={communicationDetails.type} onChange={e => setCommunicationDetails({ ...communicationDetails, type : e.target.value })}>
                                <option value="">Select</option>
                                <option value="LinkedIn Post">LinkedIn Post</option>
                                <option value="LinkedIn Message">LinkedIn Message</option>
                                <option value="Email">Email</option>
                                <option value="Phone Call">Phone Call</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label>Date of Communication :</label>
                            <input type="date" value={communicationDetails.date} onChange={e => setCommunicationDetails({ ...communicationDetails, date : e.target.value })} />
                        </div>

                        <div>
                            <label>Notes :</label>
                            <textarea value={communicationDetails.comment} onChange={e => setCommunicationDetails({ ...communicationDetails, comment : e.target.value })} ></textarea>
                        </div>

                        <button type="button" onClick={handleSubmitCommunication}>Submit</button>
                        <button type="button" onClick={() => setIsModalOpen(false)}> Cancel</button>

                    </form>

                </Modal>
            
            </div>


            <div className='notifications'>
                <Notifications />
            </div>
                
        </div>
    );
}

export default Dashboard;