import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineExpand, AiOutlineBook, AiOutlineSetting } from 'react-icons/ai'; // Import icons from react-icons/ai
import './ScreenStyle/NavTab.css'; // Import CSS file for styling
//page for routing in navigation bottom tab thingy yeup
function NavTab() {
    return (
        <nav className="nav-tab">
            <ul>
                <li>
                    <Link to="/">
                        <AiOutlineHome /> {/* Use AiOutlineHome icon */}
                    </Link>
                </li>
                <li>
                    <Link to="/scan">
                        <AiOutlineExpand /> {/* Use AiOutlineExpand icon */}
                    </Link>
                </li>
                <li>
                    <Link to="/book">
                        <AiOutlineBook /> {/* Use AiOutlineBook icon */}
                    </Link>
                </li>
                <li>
                    <Link to="/setting">
                        <AiOutlineSetting /> {/* Use AiOutlineSetting icon */}
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavTab;
