import { useSelector } from "react-redux";

function Notifications(){

    const notificationCompany = useSelector(store => store.admin.companyData);

    const categorizeCommunications = (companies) => {
        
        const today = new Date().toISOString().split('T')[0]; 
        const overdue = [];
        const dueToday = [];

        companies.forEach(company => {
            const { nextCommunication } = company;

            if(nextCommunication && nextCommunication.date){

                const commDate = new Date(nextCommunication.date);
                const formattedCommDate = commDate.toISOString().split('T')[0];

                if(formattedCommDate < today)  
                    overdue.push(company);
                
                else if (formattedCommDate === today)
                    dueToday.push(company);

            }
        });

        return { overdue, dueToday };

    };

    const { overdue, dueToday } = categorizeCommunications(notificationCompany);

    const notificationCount = overdue.length + dueToday.length;

    return (
        <>
            <h2 className="notificationsHeading">
                <span className="bell-icon">Notifications 🔔</span>
                {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
            </h2>
            
            <br />
            
            <div className="notificationsParent">

                <div>

                    <h3>Overdue Communications</h3>
                    <br />
                    {   
                        overdue.length > 0 ? (
                        overdue.map((company, index) => (
                            <div key={index}>
                                <p><strong>Company :</strong> {company.name}</p>
                                <p><strong>Date :</strong> {company.nextCommunication.date}</p>
                                <br />
                            </div>
                        ))
                    ) : (
                        <p>No overdue communications</p>
                    )}

                </div>


                <div>

                    <h3>Today's Communications</h3>
                    <br />
                    {dueToday.length > 0 ? (
                        dueToday.map((company, index) => (
                            <div key={index}>
                                <p><strong>Company :</strong> {company.name}</p>
                                <p><strong>Date :</strong> {company.nextCommunication.date}</p>
                            </div>
                        ))
                    ) : (
                        <p>No communications due today</p>
                    )}

                </div>

            </div>
        
        </>
    );
}

export default Notifications;