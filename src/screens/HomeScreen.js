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
            <div className="cover-rectangle">
            </div>
            <div className="boxes-container">
                <div className="box1">
                    <Link to="/Calculator" style={linkStyle}>
                        <img src={calkIcon} alt='Add calk' className='add-icon-book' />
                    </Link>
                </div>
                <div className="box2">
                    <Link to="/TemperatureConverter" style={linkStyle}>
                        <img src={temperatureImage} alt='Temperatur' className='add-icon-book' />
                    </Link>
                </div>
            </div>
            <div className="book-rectangle" >
                <Link to="/add-book" style={linkStyle}>
                    <img src={addBookIcon} alt='Add Book' className='add-icon-book' />
                </Link>
                <Link to="/add-book" style={linkStyle}>
                    <div className="nested-rectangle">
                        LEGG TIL NY BOK
                    </div>
                </Link>
            </div>

        </div>
    );
};

export default Home;