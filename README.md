Calendar Application for Communication Tracking -

A React-based application to efficiently track communication with companies, 
ensuring timely follow-ups and consistency in professional relationships. 
This tool enables users to log past interactions, plan future communications, and manage communication frequency based on predefined schedules.


Made with :

-> React
-> Redux
-> CSS



Table of Contents - 

1. Setup Instructions
2. Deployment Instructions
3. Application Functionality
4. Known Limitations
5. External Dependencies


1. Setup Instructions : 

-> Clone the Repository - git clone https://github.com/KiranMvarma25/Calendar-Application
-> npm i
-> npm run dev


2. Deployment Instructions :

-> Push your code to GitHub.
-> Connect repository to Netlify and choose the build folder for deployment.


3. Access the deployed application : 

After deployment, application is live at https://admirable-boba-f8e494.netlify.app/ from the Netlify.
    
    Admin Credentials - Admin, companyadmin123
    User Credentials - User, companyuser123


4. Known Limitations : 

-> Performance with Large Datasets : The application may experience performance issues when handling a large volume of companies, communications or analytics data.
-> Limited Filtering for Analytics : The communication frequency report currently allows basic filtering by company and communication method. 


5. External Dependencies : 

-> @fullcalendar/core, @fullcalendar/daygrid, @fullcalendar/interaction, @fullcalendar/react
    Description : FullCalendar is a JavaScript calendar library that provides an interactive calendar interface, ideal for managing communication schedules and displaying past and upcoming communications in the calendar view.

-> @react-pdf/renderer
    Description : React PDF renderer is used to generate and download reports in PDF format.

-> papaparse
    Description : A fast and powerful CSV parser for JavaScript used for exporting reports in CSV format.

-> @reduxjs/toolkit
    Description : A set of tools to simplify the process of managing application state using Redux, including reducers, slices and state configuration.

-> chart.js
    Description : Chart.js is a JavaScript charting library used to create visualizations, such as bar charts and pie charts for communication frequency reports.

-> react-chartjs-2
    Description : React wrapper for Chart.js used for embedding charts in the React application.

-> react-icons
    Description : A library of popular icons as React components used for UI elements such as buttons and notifications.

-> react-redux
    Description : React bindings for Redux, allowing components to connect to the Redux store and dispatch actions.

-> react-router-dom
    Description : A routing library for React used to navigate between different pages in the application.

-> react-toastify
    Description : A library for displaying toast notifications in React used for providing user feedback.

-> react-tooltip
    Description : A library for displaying tooltips used for showing additional information when hovering over completed communications.







Application Functionality -


1. Admin Module 

-> Company Management : Add, edit and delete companies.
    Includes details like Name, Location, LinkedIn Profile, Emails, Phone Numbers, Comments, and Communication Periodicity.

-> Communication Method Management : Admins can manage communication methods, including LinkedIn Post, LinkedIn Message, Email, Phone Call and Other.
    Define the sequence and set mandatory flags for each method.


2. User Module

-> Dashboard : Displays a grid with company names, last five communications, and next scheduled communication.

-> Color-coded highlights :
    Red : Overdue communication.
    Yellow : Communication due today.

-> Interactive Features : Hover over completed communications to view comments and Users can select companies and log new communications.

-> Communication Action : Users log a new communication, including the communication type, date and notes.Resets highlights (Red/Yellow) upon submission.

-> Notifications : Overdue Communications and Today's Communications sections and Notifications icon displays the count of overdue and due communications.


-> Calendar View : View past communications and manage upcoming communications.


3. Reporting and Analytics Module 

-> Communication Frequency Report : Visual representation (bar chart or pie chart) of communication frequency by method.
    Filter by company, date range, or communication method.

-> Downloadable Reports :
    Export reports in PDF or CSV format for offline analysis.