import React, { useState } from 'react';
import { IoCameraOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function Home() {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setImage(e.target.result);
        };

        reader.readAsDataURL(file);
    };

    // Array of squares with unique IDs
    const squares = [
        { id: 1, emoji: '⭐️', text: 'Favoritter 1', route: '/fav1' },
        { id: 2, emoji: '📝', text: 'Blank side', route: '/newpage' },
        { id: 3, emoji: '🌡️', text: 'Temperatur', route: '/temperatur' },
        { id: 4, emoji: '🧮', text: 'Mål og vekt', route: '/calculator' }
    ];

    return (
        <div className="home-container">
            <h1>Hjem</h1>

            <div className="rectangle-grid">
                <div className="rectangle-profile">
                    <div className="small-square">
                        <h2>Hei, Kevin</h2>
                    </div>
                    <label className="pfp-square" htmlFor="imageUpload">
                        {image ? <img src={image} alt="Profile" /> : <p>Legg til bildet</p> }
                        <input 
                            type="file" 
                            id="imageUpload" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                            style={{ display: 'none' }} 
                        />
                    </label>
                </div>
            </div>

            <div className="square-grid">
                {/* Map over the squares array to render each square */}
                {squares.map(square => (
                    <Link key={square.id} to={square.route} className="square">
                        <div className="mini-square">{square.emoji}</div>
                        <div className="option-text">{square.text}</div>
                    </Link>
                ))}
            </div>

            {/* Wrap the big rectangle with Link component */}
            <Link to="/scan" className="big-rectangle">
                <IoCameraOutline size={48} />
            </Link>
        </div>
    );
}
