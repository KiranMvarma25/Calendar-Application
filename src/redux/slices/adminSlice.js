import { createSlice } from "@reduxjs/toolkit";

const today = new Date().toISOString().split("T")[0];

const adminSlice = createSlice({

    name : 'admin',

    initialState : {
        companyData : [
            {
                name : "ENTNT",
                location : "Abu Dhabi",
                linkedinprofile : "https://www.linkedin.com/company/entnt/?originalSubdomain=in",
                emails : "entnt@gmail.com",
                phonenumbers : "9994445555",
                comments : "ENTNT is a complete workforce solutions provider.",
                communicationperiodicity : "Every 2 weeks",
                communications : [
                    { type : "LinkedIn Post", date : "2024-12-10", comment : "Successful post about new product launch." },
                    { type : "Phone Call", date : "2024-11-25", comment : "Interacted with their Team Leaders" },
                    { type : "Email", date : "2024-12-18", comment : "Discussed partnership opportunities." },
                    { type : "LinkedIn Message", date : "2024-12-7", comment : "Discussed about the Product" },
                    { type : "Other", date : "2024-10-30", comment : "Partnership Advantages" }
                ],
                nextCommunication : { type : "Email", date : "2024-12-29" },
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
                    { type : "Email", date : "2024-12-05", comment : "Discussed partnership opportunities." },
                    { type : "Phone Call", date : "2024-12-15", comment : "Project discussion"},
                    { type : "LinkedIn Post", date : "2024-11-01", comment : "Interacted with their Team Leaders."  },
                    { type : "LinkedIn Message", date : "2024-11-25", comment : "Successful post about new product launch." },
                    { type : "Other", date: "2024-12-1", comment : "Queried about the Company Insights" }
                ],
                today: today,
                nextCommunication : { type : "LinkedIn Post", date : today },
            },
        ],
        communicationMethods : [
            { name : "LinkedIn Post", description : "Post on LinkedIn", sequence : 1, mandatory : true },
            { name : "LinkedIn Message", description : "Direct message on LinkedIn", sequence : 2, mandatory : true },
            { name : "Email", description : "Send an email", sequence : 3, mandatory : true },
            { name : "Phone Call", description : "Make a phone call", sequence : 4, mandatory : false },
            { name : "Other", description : "Other communication methods", sequence : 5, mandatory : false },
        ],
    },


    reducers : {
        
        addCompany : (state, action) => {
            state.companyData.push(action.payload);
        },
        
        deleteCompany : (state, action) => {
            state.companyData.splice(action.payload, 1);
        },
        
        editCompany : (state, action) => {
            const { index, updatedData } = action.payload;
            if(state.companyData[index])
                state.companyData[index] = updatedData;
        },
        
        addCommunicationMethod: (state, action) => {
            state.communicationMethods.push(action.payload);
        },
        
        deleteCommunicationMethod: (state, action) => {
            state.communicationMethods.splice(action.payload, 1);
        },
        
        editCommunicationMethod: (state, action) => {
            const { index, updatedData } = action.payload;
            if(state.communicationMethods[index]) 
                state.communicationMethods[index] = updatedData;
        },
        
        logCommunication: (state, action) => {
            const { companyName, communication } = action.payload;
            const companyIndex = state.companyData.findIndex(company => company.name === companyName);
      
            if(companyIndex !== -1){
              
              if(!state.companyData[companyIndex].communications) 
                state.companyData[companyIndex].communications = [];
      
              state.companyData[companyIndex].communications.push(communication);
      
              if(communication.date){
                state.companyData[companyIndex].nextCommunication = {
                  type : communication.type,
                  date : communication.date,
                };
              }
            }
        }
        
    }
})

export default adminSlice.reducer;
export const { addCompany, deleteCompany, editCompany, addCommunicationMethod, deleteCommunicationMethod, editCommunicationMethod, logCommunication } = adminSlice.actions;