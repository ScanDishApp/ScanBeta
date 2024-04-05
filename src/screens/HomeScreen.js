import React from 'react';
import './ScreenStyle/Home.css'; // Import the external CSS file

export default function Home() {
    return (
        <div className="home-container">
            <h1>HOME</h1>


            <div className="rectangle-grid">
                <div className="rectangle">
                    <h2>👋 Hello...</h2>
                </div>
            </div>

            <div className="square-grid">
                {/* Four squares */}
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
            </div>
        </div>
    );
}
