import React from 'react';
import './ScreenStyle/Setting.css';

export default function Setting() {
    return (
        <div className="setting-container">
            <h1>ScanDish</h1>

            <div className="rectangle-grid">
                <div className="rectangle">
                    <h2>⚙️ Settings...</h2>
                </div>
            </div>

            <div className="set-options">
                <div className="rectangle tab">
                    <div className="small-square"></div>
                    <p>Option 1</p>
                </div>
                <div className="rectangle tab">
                    <div className="small-square"></div>
                    <p>Option 2</p>
                </div>
                <div className="rectangle tab">
                    <div className="small-square"></div>
                    <p>Option 3</p>
                </div>
            </div>
        </div>
    );
}
