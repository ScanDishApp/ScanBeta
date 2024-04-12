import React from 'react';
import { IoCameraOutline } from 'react-icons/io5';
import './ScreenStyle/DummyPage.css';

export default function DummyPage() {
    // Dummy data for content, followers, and following
    const contentCount = 20; // Replace with actual count
    const followersCount = 1000; // Replace with actual count
    const followingCount = 500; // Replace with actual count

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
                    <h2>Another Rectangle</h2>
                </div>
            </div>

            <div className="rectangle-grid">
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
                <div className="square">
                    <div className="mini-square">🔨</div>
                    <div className="option-text">Innstillinger 4</div>
                </div>
            </div>

            <div className="big-rectangle">
                <h2>Logg Ut</h2>
            </div>
        </div>
    );
}
