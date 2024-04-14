import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineExpand, AiOutlineBook, AiOutlineUser } from 'react-icons/ai'; 
import './ScreenStyle/NavTab.css'; 
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
                    <Link to="/profile">
                        <AiOutlineUser /> 
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavTab;