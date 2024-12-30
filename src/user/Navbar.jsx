import { Link } from "react-router-dom";

function Navbar(){
    return (
        <div className="navbar">
            <Link to="/user"><h2 className="navbarLinks">Meetings</h2></Link>
            <Link to="calender"><h2 className="navbarLinks">Calender</h2></Link>
            <Link to="analytics"><h2 className="navbarLinks">Analytics</h2></Link>            
        </div>
    )
}


export default Navbar;