import React, { useState } from 'react';
import "../styles/header.css"
import { Link, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthChecker } from '../services/AuthChecker';

const Header = () => {
    const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

    const handleNavbarExpand = () => {
        setIsNavbarExpanded(!isNavbarExpanded);
    };

  return (
    <nav className='header-main-body'>
        <Link to="" className="header-logo">
            <h3 className='logo-h one'>Secret</h3>
            <h3 className='logo-h two'>desires</h3>
        </Link>
        <i class="fa-solid fa-bars" onClick={()=>handleNavbarExpand()}></i>
        <div className={`mob-container ${isNavbarExpanded ? 'expanded' : ''}`}>
            <div className="header-icons">
                <ul>
                    <li>
                    <NavLink to="/" className="NavLink">
                    <i class="fa-brands fa-rocketchat"></i>
                        Chat
                    </NavLink>
                    </li>
                    <li>
                    <NavLink to="/Char_List" className="NavLink">
                    <i class="fa-solid fa-user-group"></i>
                        My Characters
                    </NavLink>
                    </li>
                    <li>
                    <NavLink to="/Genetr" className="NavLink">
                    <i class="fa-solid fa-camera"></i>
                        Generate Images
                    </NavLink>
                    </li>
                    <li className='Create_char'>
                    <NavLink to="/Create" className="NavLink">
                    <i class="fa-solid fa-heart"></i>
                        Create Characters
                    </NavLink>
                    </li>
                </ul>
            </div>
            <div className="User">
                <i class="fa-solid fa-circle-user"></i>
                My Profile
                <i class="fa-solid fa-caret-down"></i>
            </div>
        </div>
    </nav>
  )
}

export default Header