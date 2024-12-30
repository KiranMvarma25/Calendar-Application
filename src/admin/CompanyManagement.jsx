import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addCompany } from "../redux/slices/adminSlice";
import { CommunicationMethodManagement, CompanyDetails } from "./CommunicationMethodManagement";
import { Link } from "react-router-dom";
import { BsBuildingAdd } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";

function CompanyManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name : "",
    location : "",
    linkedinprofile : "",
    emails : "",
    phonenumbers : "",
    comments : "",
    communicationperiodicity : ""
  });

  const dispatch = useDispatch();

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(ps => ({
      ...ps,
      [name] : value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addCompany(formData));
    setFormData({
      name : "",
      location : "",
      linkedinprofile : "",
      emails : "",
      phonenumbers : "",
      comments : "",
      communicationperiodicity : "",
    });
    handleCloseModal();
  }

  return (
    <>
      <CompanyDetails />
      <br />
      <button className="addCompanyButton" onClick={handleOpenModal}><p className="reactIcons">Add Company <BsBuildingAdd /></p></button>
      <br />
      <br />
      <Link className="dashboardLink" to='/user'>Dashboard <MdDashboard /></Link>
      <br />
      <br />

      {isModalOpen && (

        <div className="modal-addcompany">

          <div className="addcompany">

            <h2>Add Company Details</h2>

            <br />

            <form onSubmit={handleSubmit}>

              <label htmlFor="name">Name</label>
              <input type="text" value={formData.name} id="name" name="name" onChange={handleChange} required />
              <br />

              <label htmlFor="location">Location</label>
              <input type="text" value={formData.location} id="location" name="location" onChange={handleChange} required />
              <br />

              <label htmlFor="linkedinprofile">LinkedIn Profile</label>
              <input type="text" value={formData.linkedinprofile} id="linkedinprofile" name="linkedinprofile" onChange={handleChange} required />
              <br />

              <label htmlFor="emails">Emails</label>
              <input type="email" value={formData.emails} id="emails" name="emails" onChange={handleChange} required />
              <br />

              <label htmlFor="phonenumbers">Phone Numbers</label>
              <input type="number" value={formData.phonenumbers} id="phonenumbers" name="phonenumbers" onChange={handleChange} required />
              <br />

              <label htmlFor="comments">Comments</label>
              <input type="text" value={formData.comments} id="comments" name="comments" onChange={handleChange} />
              <br />

              <label htmlFor="communicationperiodicity">Communication Periodicity</label>
              <input type="text" value={formData.communicationperiodicity} id="communicationperiodicity" name="communicationperiodicity" onChange={handleChange} required />
              <br />

              <button type="submit">Add</button>
              <button type="button" onClick={handleCloseModal}>Cancel</button>
            </form>

          </div>

        </div>
      )}

      <CommunicationMethodManagement />

      <br />
      <br />
      <br />
    </>
  );
}

export default CompanyManagement;