import React from 'react';
import { Link } from 'react-router-dom';
import temperatureImage from '../../src/assets/temperature.png';
import coverImage from '../../src/assets/grams.png';
import addBookIcon from '../../src/assets/addbook.png';
import calkIcon from '../../src/assets/calk.png';

const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'default',
    display: 'inline-block',
    lineHeight: 'inherit',
};

const Home = () => {
    return (
        <div className="home-container">
            <div className="cover-rectangle" style={{ backgroundImage: `url(${coverImage})` }}></div>
            <div className='randomText'>What's Cookin, Good Lookin</div>
            <div className="boxes-container">
                <Link to="/Calculator" className="box1" style={linkStyle}>
                    <div className="nested-box">
                        MÅLENHETER
                    </div>
                    <img src={calkIcon} alt='Add calk' className='add-icon-book' />
                </Link>
                <Link to="/TemperatureConverter" className="box2" style={linkStyle}>
                    <div className="nested-box">
                        TEMPERATUR
                    </div>
                    <img src={temperatureImage} alt='Temperatur' className='add-icon-book' />
                </Link>
            </div>
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