import React, { useState } from 'react';
import { IoCameraOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './ScreenStyle/Home.css';

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

    return (
        <div className="home-container">
            <h1>ScanDish</h1>

            <div className="rectangle-grid">
                <div className="rectangle">
                    <h2>👋 Velkommen...</h2>
                </div>
            </div>

            <div className="rectangle-grid">
                <div className="rectangle-profile">
                    <div className="small-square">
                        <h2>Hei, Kevin</h2>
                    </div>
                    <label className="pfp-square" htmlFor="imageUpload">
                        {image ? <img src={image} alt="Profile" /> : <p>Legg til bidet</p> }
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
                <div className="square">
                    <div className="mini-square">⭐️</div>
                    <div className="option-text">Favoritter 1</div>
                </div>
                <div className="square">
                    <div className="mini-square">👨‍🍳</div>
                    <div className="option-text">Chef 2</div>
                </div>
                <div className="square">
                    <div className="mini-square">🛒</div>
                    <div className="option-text">Notis 3</div>
                </div>
                <div className="square">
                    <div className="mini-square">🧮</div>
                    <div className="option-text">Kalkulator 4</div>
                </div>
            </div>

            {/* Wrap the big rectangle with Link component */}
            <Link to="/newpage" className="big-rectangle">
                <IoCameraOutline size={48} />
            </Link>
        </div>
    );
}
