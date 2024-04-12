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
const userId = localStorage.getItem('userId');
console.log(userId);
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
                 {/* Conditionally render the "Profile" link */}
                 {userId ? (
                        <Link to="/book">
                            <AiOutlineUser /> 
                        </Link>
                    ) : (
                        // Render something else if userid doesn't exist
                        <Link to="/profile">
                            <AiOutlineUser /> 
                        </Link>
                    )}
            </ul>
        </nav>
    );
}

export default NavTabContainer; 
