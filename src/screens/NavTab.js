import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineExpand, AiOutlineBook, AiOutlineUser } from 'react-icons/ai'; 
import './ScreenStyle/NavTab.css'; 

// New component NavTabContainer
function NavTabContainer() {
    return (
        <div className="nav-tab-container">
            <NavTab />
        </div>
    );
}

// NavTab component
function NavTab() {
    return (
        <nav className="nav-tab">
            <ul>
                <li>
                    <Link to="/">
                        <AiOutlineHome /> 
                    </Link>
                </li>
                <li>
                    <Link to="/scan">
                        <AiOutlineExpand /> 
                    </Link>
                </li>
                <li>
                    <Link to="/book">
                        <AiOutlineBook /> 
                    </Link>
                </li>
                <li>
                    <Link to="/setting">
                        <AiOutlineUser /> 
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavTabContainer; // Export NavTabContainer instead of NavTab
