import React from 'react';
import { IoCameraOutline } from 'react-icons/io5';
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
                <div className="square">
                    <div className="mini-square">😀</div> {/* Mini square added with 😀 emoji */}
                </div>
                <div className="square">
                    <div className="mini-square">😀</div> {/* Mini square added with 😀 emoji */}
                </div>
                <div className="square">
                    <div className="mini-square">😀</div> {/* Mini square added with 😀 emoji */}
                </div>
                <div className="square">
                    <div className="mini-square">😀</div> {/* Mini square added with 😀 emoji */}
                </div>
            </div>

            <div className="big-rectangle">
                <IoCameraOutline size={48} />
            </div>
        </div>
    );
}
