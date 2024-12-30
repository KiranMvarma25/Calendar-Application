import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCompany, editCompany } from "../redux/slices/adminSlice";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";

function EditCompanyModal({ isOpen, onClose, companyData, onSave }){

  const [formData, setFormData] = useState(companyData || {});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name] : value });
  }

  function handleSave() {
    onSave(formData);
    onClose();
  }

  if(!isOpen) 
    return null;

  return (
    <div className="modal-addcompany">
      <div className="addcompany">
        
        <h2>Edit Company Details</h2>
        
        <br />

        <form>
          
          <label>Name :</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          
          <label> Location :</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange}/>
          
          <label>LinkedIn Profile :</label>
          <input type="text" name="linkedinprofile" value={formData.linkedinprofile} onChange={handleChange}/>

          <label>Emails :</label>
          <input type="text" name="emails" value={formData.emails} onChange={handleChange}/>
          
          <label>Phone Numbers :</label>
          <input type="text" name="phonenumbers" value={formData.phonenumbers} onChange={handleChange}/>
          
          <label>Comments :</label>
          <textarea name="comments" value={formData.comments} onChange={handleChange}/>
          
          <label>Communication Periodicity :</label>
          <input type="text" name="communicationperiodicity" value={formData.communicationperiodicity} onChange={handleChange}/>

        </form>
        
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      
      </div>
    </div>
  );
}

export function CompanyDetails(){

  const companyData = useSelector(store => store.admin.companyData);
  const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCompanyIndex, setSelectedCompanyIndex] = useState(null);

  function handleDeleteCompany(index) {
    dispatch(deleteCompany(index));
  }

  function handleEditCompany(index) {
    setSelectedCompanyIndex(index);
    setModalOpen(true);
  }

  function handleSave(updatedData) {
    if (selectedCompanyIndex !== null) {
      dispatch(editCompany({ index: selectedCompanyIndex, updatedData }));
    }
  }

  return (
    <>
      <h1 className="companiesDataHeading">Companies Data</h1>
      <br />
      {companyData.length > 0 ? (
        <table border="3" className="table">

          <thead align="center">
            
            <tr align="center" className="thead">
              <th className="trInthead">Company</th>
              <th className="trInthead">Location</th>
              <th className="trInthead">LinkedIn Profile</th>
              <th className="trInthead">Emails</th>
              <th className="trInthead">Phone Numbers</th>
              <th className="trInthead">Comments</th>
              <th className="trInthead">Communication Periodicity</th>
              <th className="trInthead">Actions</th>
            </tr>

          </thead>
          
          <tbody className="tbody" align="center">
            {companyData.map((data, index) => (
              
              <tr align="center" key={index}>
                <td>{data.name}</td>
                <td>{data.location}</td>
                <td><a href={data.linkedinprofile} target="_blank" rel="noopener noreferrer">Visit</a></td>
                <td className="tdIntbody">{data.emails}</td>
                <td>{data.phonenumbers}</td>
                <td>{data.comments}</td>
                <td>{data.communicationperiodicity}</td>
                <td>
                    <button className="deleteedit" onClick={() => handleEditCompany(index)}><p className="reactIcons">Edit <BiSolidEditAlt /></p></button>
                    <button className="deleteedit" onClick={() => handleDeleteCompany(index)}><p className="reactIcons">Delete <RiDeleteBin2Line /></p></button>
                </td>
              </tr>

            ))}
          </tbody>

        </table>

      ) : (

        <p>No Company Data Available</p>

      )}

      <EditCompanyModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        companyData={companyData[selectedCompanyIndex]}
        onSave={handleSave}
      />
    </>
  );
}







export function CommunicationMethodManagement(){
    const communicationMethods = useSelector(store => store.admin.communicationMethods);
    const dispatch = useDispatch();

    const handleEditMethod = (index) => {
        const updatedName = prompt("Enter Updated Method Name", communicationMethods[index].name);
        const updatedDescription = prompt("Enter Updated Description", communicationMethods[index].description);
        const updatedSequence = prompt("Enter Updated Sequence", communicationMethods[index].sequence);
        const updatedMandatory = confirm("Is this method mandatory?");

        const updatedData = {
            ...communicationMethods[index],
            name: updatedName,
            description: updatedDescription,
            sequence: Number(updatedSequence),
            mandatory: updatedMandatory,
        };

        dispatch(editCommunicationMethod({ index, updatedData }));
    };

    const handleDeleteMethod = (index) => {
        dispatch(deleteCommunicationMethod(index));
    };

    return (
        <>
            <h2 className="communicationMethodsHeading">Communication Methods</h2>

            <table border="3" className="table2">

                <thead align="center">
                    <tr align="center" className="thead2">
                        <th className="trInthead2">Name</th>
                        <th className="trInthead2">Description</th>
                        <th className="trInthead2">Sequence</th>
                        <th className="trInthead2">Mandatory</th>
                        <th className="trInthead2">Actions</th>
                    </tr>
                </thead>

                <tbody className="tbody2" align="center">
                    {
                        communicationMethods.map((method, index) => (
                            <tr align="center" key={index}>
                                <td className="tdIntbody2">{method.name}</td>
                                <td className="tdIntbody2">{method.description}</td>
                                <td className="tdIntbody2">{method.sequence}</td>
                                <td className="tdIntbody2">{method.mandatory ? "Yes" : "No"}</td>
                                <td>
                                    <button className="deleteedit" onClick={() => handleEditMethod(index)}>Edit</button>
                                    <button className="deleteedit" onClick={() => handleDeleteMethod(index)}>Delete</button>
                                </td>
                            </tr>
                    ))}
                </tbody>
                
            </table>
        </>
    );
}