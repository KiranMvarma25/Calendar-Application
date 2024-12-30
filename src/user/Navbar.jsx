import { Link } from "react-router-dom";
import { AiOutlineInteraction } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";

function Navbar(){
    return (
        <div className="navbar">
            <Link to="/user"><h2 className="navbarLinks">Meetings <AiOutlineInteraction /></h2></Link>
            <Link to="calender"><h2 className="navbarLinks">Calender <FaCalendarAlt /></h2></Link>
            <Link to="analytics"><h2 className="navbarLinks">Analytics <FaChartSimple /></h2></Link>            
        </div>
    )
}


export default Navbar;