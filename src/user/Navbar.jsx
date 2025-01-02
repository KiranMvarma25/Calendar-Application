import { Link, NavLink } from "react-router-dom";
import { AiOutlineInteraction } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";

function Navbar(){
    return (
        <div className="navbar">
            <NavLink to="/user" className="navbarLink"><h2 >Meetings <AiOutlineInteraction /></h2></NavLink>
            <NavLink to="calender" className="navbarLinks" ><h2>Calender <FaCalendarAlt /></h2></NavLink>
            <NavLink to="analytics" className="navbarLinks"><h2>Analytics <FaChartSimple /></h2></NavLink>            
        </div>
    )
}


export default Navbar;