import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCameraOutline } from 'react-icons/io5';
import './ScreenStyle/DummyPage.css';

export default function DummyPage() {
    const navigate = useNavigate();
    // Dummy data for content, followers, and following
    const contentCount = 20; // Replace with actual count
    const followersCount = 1000; // Replace with actual count
    const followingCount = 500; // Replace with actual count
    
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setImage(e.target.result);
        };

        reader.readAsDataURL(file);
    };
    const handleLogOut = () => {
        let userId = null
        localStorage.setItem("userId", userId)
        navigate('/Profile');  
    }
    const handleEditUser = () => {
        navigate('/edit-user-page');  
    }

    return (
        <div className="profile-container">
            <h1>ScanDish</h1>

            <div className="rectangle-grid">
                <div className="rectangle">
                    <h2>👑 Profil...</h2>
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
                <div className="counter">
                    <h2>{contentCount} posts // {followersCount} følgere // {followingCount} følger</h2>
                </div>
            </div>

            <div className="square-grid">
                <div className="square">
                    <div className="mini-square">🔔</div>
                    <div className="option-text">Varsler</div>
                </div>
                <div className="square">
                    <div className="mini-square">👯</div>
                    <div className="option-text">Venner</div>
                </div>
                <div className="square">
                    <div className="mini-square">🛒</div>
                    <div className="option-text">Notis 3</div>
                </div>
                <div onClick={handleEditUser} className="square">
                    <div className="mini-square">🔨</div>
                    <div className="option-text">Innstillinger</div>
                </div>
            </div>

            <div className="big-rectangle">
                <h2 onClick={handleLogOut}>Logg Ut</h2>
            </div>
        </div>
    );
}
