import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineExpand, AiOutlineBook, AiOutlineUser, AiOutlineHeart } from 'react-icons/ai'; 
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
                    <Link to="/MyBooks">
                        <AiOutlineBook /> 
                    </Link>
                </li>
                <li>
                    <Link to="/favorites-screen">
                        <AiOutlineHeart/> 
                    </Link>
                </li>
                <li>
                    <Link to="/dummy-page">
                        <AiOutlineUser /> 
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavTab;