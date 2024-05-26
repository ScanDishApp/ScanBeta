import React from 'react';
import { Link } from 'react-router-dom';
import { BiBookOpen } from "react-icons/bi";
import { AiOutlineHome, AiOutlineExpand, AiOutlineBook, AiOutlineUser, AiOutlineHeart } from 'react-icons/ai'; 
import '../screens/ScreenStyle/NavTab.css'; 
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
                        <BiBookOpen /> 
                    </Link>
                </li>
                <li>
                    <Link to="/favorites-screen">
                        <AiOutlineHeart/> 
                    </Link>
                </li>
                <li>
                    <Link to="/my-page">
                        <AiOutlineUser /> 
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavTab;