import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { toast } from "react-toastify";

function App(){

  const [adminData, setAdminData] = useState({ name : '', password : '' });       // State for admin credentials and input fields

  const adminCredentials = { name : "Admin", password : "companyadmin123" };      // Hardcoded admin credentials for comparison

  const navigate = useNavigate();

  function handleClickAdminLogin(e){                                              // Handle Admin login on form submission

    e.preventDefault();
    
    if(adminCredentials.name === adminData.name && adminCredentials.password === adminData.password) 
      navigate('/admin');
    
    else 
      // alert("Incorrect Admin Details");
    toast.error("Incorrect Admin Details");
    
  }

  

  const [userData, setUserData] = useState({ name : '', password : '' });         // State for user credentials and input fields

  const userCredentials = { name : "User", password : "companyuser123" };         // Hardcoded user credentials for comparison

  function handleClickUserLogin(e){                                               // Handle User login on form submission

    e.preventDefault();

    if(userCredentials.name === userData.name && userCredentials.password === userData.password) 
      navigate('/user');
    
    else 
      // alert("Incorrect User Details");
    toast.error("Incorrect User Details");
    
  }

  return (
      <>
        <div className="parent">  {/* Forms for Admin and User Login */}

          <form className="adminForm" onSubmit={handleClickAdminLogin}>
            
            <h1 className="headings">Admin Log-In</h1>
            
            <br />

            <label className="inputLabel" htmlFor="adminName">Admin Name</label>
            <br />
            <input className="inputField" type="text" id="adminName" value={adminData.name} onChange={(e) => setAdminData({ ...adminData, name : e.target.value })} />

            <br />
            <br />
            
            <label className="inputLabel" htmlFor="adminPassword">Admin Password</label>
            <br />
            <input className="inputField" type="password" id="adminPassword" value={adminData.password }onChange={(e) => setAdminData({ ...adminData, password : e.target.value })}/>
            
            <br />
            <br />

            <button className="loginButtons" type="submit"><span className="reactIcons">Log In <IoLogIn /></span></button>
          
          </form>

          <form className="userForm" onSubmit={handleClickUserLogin}>

            <h1 className="headings">Employee Log-In</h1>

            <br />

            <label className="inputLabel" htmlFor="userName">Employee Name</label>
            <br />
            <input className="inputField" type="text" id="userName" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })}/>

            <br />
            <br />

            <label className="inputLabel" htmlFor="userPassword">Employee Password</label>
            <br />
            <input className="inputField" type="password" id="userPassword" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })}/>

            <br />
            <br />

            <button className="loginButtons" type="submit"><p className="reactIcons">Log In <IoLogIn /></p></button>

          </form>

        </div>

      </>
  );
}


export default App;