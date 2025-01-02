import { Outlet } from "react-router-dom";          // Importing Outlet to render child routes
import Navbar from "./Navbar";

function User(){
    return (
        <>
            <Navbar />
            <br />
            <Outlet />                              {/* Outlet renders the matched child route component */}
        </>
    )
}

export default User;