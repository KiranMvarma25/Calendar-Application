import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function User(){
    return (
        <>
            <h1 className="dashboardHeading">Dashboard</h1>
            <Navbar />
            <br />
            <Outlet />
        </>
    )
}

export default User;