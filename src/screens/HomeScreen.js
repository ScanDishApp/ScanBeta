import React from 'react';
import { IoCameraOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// Import your images
import temperatureImage from '../../src/assets/temperature.png';
import coverImage from '../../src/assets/hei.png'; // Assuming you have a cover image
import addBookIcon from '../../src/assets/addbook.png';

export default function Home() {
    // Array of squares with unique IDs and corresponding images
    const squares = [
        { id: 1, route: '/fav1', image: temperatureImage },
        { id: 2, route: '/fav1', image: temperatureImage },
    ];

    return (
        <div className="home-container">
            {/* Cover image rectangle */}
     
            <div className="cover-rectangle" style={{ backgroundImage: `url(${coverImage})` }}></div>
                <div className='randomText'>What's Cookin, Good Lookin</div>
            <div className="square-grid">
                {/* Map over the squares array to render each square */}
                {squares.map(square => (
                    <Link key={square.id} to={square.route} className="square-home">
                        <div className="square-content">
                            <img src={square.image} alt={square.text} className="square-image" />
                            <div className="option-text">{square.text}</div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className='AddBook'>
                <img src={addBookIcon} alt='Add Book' className='add-icon' />
            </div>
            <div className='goScan'>
                <img src={addBookIcon} alt='Add Book' className='add-icon' />
            </div>
        </div>
    );
}
