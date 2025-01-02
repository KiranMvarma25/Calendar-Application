export const companies = [
    
    {
        name : "ENTNT",
        location : "Abu Dhabi",
        linkedinprofile : "https://www.linkedin.com/company/entnt/?originalSubdomain=in",
        emails : "entnt@gmail.com",
        phonenumbers : "9994445555",
        comments : "ENTNT is a complete workforce solutions provider.",
        communicationperiodicity : "Every 2 weeks",
        communications : [
            { type : "LinkedIn Post", date : "2024-11-01", comment : "Successful post about new product launch." },
            { type : "LinkedIn Message", date : "2024-11-15", comment : "Interacted with their Team Leaders." },
            { type : "Email", date : "2024-11-19", comment : "Discussed partnership opportunities." },
            { type : "Phone Call", date : "2024-12-02", comment : "Discussed about the Product." },
            { type : "Other", date : "2024-12-16", comment : "Partnership Advantages." }
        ],
        nextCommunication : { type : "LinkedIn Post", date : "2024-12-30" },
    },

    {
        name : "Google",
        location : "USA",
        linkedinprofile : "https://www.linkedin.com/company/google/posts/?feedView=all",
        emails : "google@gmail.com",
        phonenumbers : "2225557777",
        comments : "Google is a corporation that specializes in online services.",
        communicationperiodicity : "Every 4 weeks",
        communications : [
            { type : "LinkedIn Post", date : "2024-08-09", comment : "Discussed partnership opportunities." },
            { type : "LinkedIn Message", date : "2024-09-10", comment : "Project discussion." },
            { type : "Email", date : "2024-10-08", comment : "Interacted with their Team Leaders." },
            { type : "Phone Call", date : "2024-11-05", comment : "Successful post about new product launch." },
            { type : "Other", date : "2024-12-03", comment : "Queried about the Company Insights." }
        ],
        nextCommunication : { type : "LinkedIn Post", date : new Date().toISOString().split("T")[0] },
    },

    {
        name : "Accenture",
        location : "Ireland",
        linkedinprofile : "https://www.linkedin.com/company/accenture/posts/?feedView=all",
        emails : "accenture@gmail.com",
        phonenumbers : "1241242",
        comments : "Accenture is a global services company with leading capabilities in digital cloud and security..",
        communicationperiodicity : "Every 1 week",
        communications : [
            { type : "Email", date : "2024-11-28", comment : "Successful post about new product launch." },
            { type : "Phone Call", date : "2024-12-05", comment : "Interacted with their Team Leaders." },
            { type : "Other", date : "2024-12-12", comment : "Discussed partnership opportunities." },
            { type : "LinkedIn Post", date : "2024-12-19", comment : "Discussed about the Product." },
            { type : "LinkedIn Message", date : "2024-12-26", comment : "Partnership Advantages." }
        ],
        nextCommunication : { type : "Email", date : "2025-01-04" },
    },

    {
        name : "Apple",
        location : "USA",
        linkedinprofile : "https://www.linkedin.com/company/apple/",
        emails : "apple@gmail.com",
        phonenumbers : "4522436",
        comments : "Apple is a consumer electronics company famous for creating the iPhone, iPad and Macintosh computers.",
        communicationperiodicity : "Every 3 weeks",
        communications : [
            { type : "LinkedIn Post", date : "2024-09-12", comment : "Discussed partnership opportunities." },
            { type : "LinkedIn Message", date : "2024-10-10", comment : "Project discussion." },
            { type : "Email", date : "2024-10-31", comment : "Interacted with their Team Leaders." },
            { type : "Phone Call", date : "2024-11-21", comment : "Successful post about new product launch." },
            { type : "Other", date : "2024-12-12", comment : "Queried about the Company Insights." }
        ],
        nextCommunication : { type : "LinkedIn Post", date : new Date().toISOString().split("T")[0] },
    },

];

export const communicationMethods = [
    { name : "LinkedIn Post", description : "Post on LinkedIn", sequence : 1, mandatory : true },
    { name : "LinkedIn Message", description : "Direct message on LinkedIn", sequence : 2, mandatory : true },
    { name : "Email", description : "Send an email", sequence : 3, mandatory : true },
    { name : "Phone Call", description : "Make a phone call", sequence : 4, mandatory : false },
    { name : "Other", description : "Other communication methods", sequence : 5, mandatory : false },
];