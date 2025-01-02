import { createSlice } from "@reduxjs/toolkit";
import { companies, communicationMethods } from "../../utils/companiesData";

const today = new Date().toISOString().split("T")[0];

const adminSlice = createSlice({

    name : 'admin',

    initialState : {

            companyData : companies,
        
            communicationMethods : communicationMethods,
    
    },


    reducers : {

        addCompany : (state, action) => {
            const newCompany = action.payload;
            const today = new Date().toISOString().split("T")[0];
            newCompany.nextCommunication = { type : "LinkedIn Post", date : today }; 
            state.companyData.push(newCompany);
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
               
                const company = state.companyData[companyIndex];
                
                if(!company.communications)
                    company.communications = [];
                
                company.communications.push(communication);

                const currentDate = new Date(communication.date);
                const periodicityDays = {
                    "Every 1 week" : 7,
                    "Every 2 weeks" : 14,
                    "Every 3 weeks" : 21,
                    "Every 4 weeks" : 28,
                };
        
                const periodicity = periodicityDays[company.communicationperiodicity] || 14; 
                const nextDate = new Date(currentDate)
                nextDate.setDate(currentDate.getDate() + periodicity);
        
                const currentMethodIndex = state.communicationMethods.findIndex(method => method.name === communication.type);
                const nextMethodIndex = (currentMethodIndex + 1) % state.communicationMethods.length;
                const nextMethod = state.communicationMethods[nextMethodIndex]
        
                company.nextCommunication = {
                    type : nextMethod.name,
                    date : nextDate.toISOString().split("T")[0],
                };
            }
        },
        
    }
})

export default adminSlice.reducer;
export const { addCompany, deleteCompany, editCompany, addCommunicationMethod, deleteCommunicationMethod, editCommunicationMethod, logCommunication } = adminSlice.actions;