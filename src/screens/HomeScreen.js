import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// Import your images
import temperatureImage from '../../src/assets/temperature.png';
import coverImage from '../../src/assets/grams.png'; // Assuming you have a cover image
import addBookIcon from '../../src/assets/addbook.png';
import calkIcon from '../../src/assets/calk.png';

const linkStyle = {
    textDecoration: 'none', // Remove underline
    color: 'inherit',       // Inherit text color (no default blue)
    cursor: 'default',      // Use default cursor (not pointer)
    display: 'inline-block', // Ensure block behavior for element
    lineHeight: 'inherit',   // Inherit line height for proper alignment
};

const Home = () => {
    return (
        <div className="home-container">
            {/* Cover image rectangle */}
            <div className="cover-rectangle" style={{ backgroundImage: `url(${coverImage})` }}></div>
            <div className='randomText'>What's Cookin, Good Lookin</div>

            <div className="boxes-container">
                {/* Box 1 - Navigate to '/units' */}
                <Link to="/Calculator" className="box1" style={linkStyle}>
                    <div className="nested-box">
                    MÅLENHETER
                    </div>
                    <img src={calkIcon} alt='Add calk' className='add-icon-book' />
                </Link>

                {/* Box 2 - Navigate to '/scan' */}
                <Link to="/TemperatureConverter" className="box2" style={linkStyle}>
                    <div className="nested-box">
                        TEMPERATUR
                    </div>
                    <img src={temperatureImage} alt='Temperatur' className='add-icon-book' />
                </Link>
            </div>

            {/* Additional rectangle at the bottom - Navigate to '/add-book' */}
            <Link to="/add-book" className="book-rectangle" style={linkStyle}>
                <div className="nested-rectangle">
                    LEGG TIL NY BOK 
                </div>
                <img src={addBookIcon} alt='Add Book' className='add-icon-book' />
            </Link>
        </div>
    );
};

export default Home;
