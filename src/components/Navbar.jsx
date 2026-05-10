import { NavLink } from "react-router-dom"
import HomePage from "../Pages/HomePage"

import Style from "./Navbar.module.css"
import Logo from "./Logo"

function Navbar() {
    return (
        <nav>
            <Logo/>
            <ul>
                <li  ><NavLink className={({isActive})=> isActive? "cta-secondary active" :"cta-secondary" } to="/">Home</NavLink></li>
                <li ><NavLink className="cta-secondary" to="/books">books</NavLink></li>
                <li ><NavLink className="cta-secondary" to="/favorites">Favorites</NavLink></li>
                
                

            </ul>
            
        </nav>
    )
}

export default Navbar
