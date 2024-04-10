import React from 'react';
import { IoCameraOutline } from 'react-icons/io5';
import './ScreenStyle/Home.css';

export default function Home() {
    return (
        <div className="home-container">
            <h1>ScanDish</h1>

            <div className="rectangle-grid">
                <div className="rectangle">
                    <h2>👋 Velkommen...</h2>
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

            <div className="big-rectangle">
                <IoCameraOutline size={48} />
            </div>
        </div>
    );
}
