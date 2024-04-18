import React, { useState } from 'react';
import './ScreenStyle/Temp.css';

export default function Temperatur() {
    const [celsius, setCelsius] = useState('');
    const [fahrenheit, setFahrenheit] = useState('');

    const handleCelsiusChange = (e) => {
        const value = e.target.value;
        setCelsius(value);
        setFahrenheit(value !== '' ? (parseFloat(value) * 9/5) + 32 : '');
    };

    const handleFahrenheitChange = (e) => {
        const value = e.target.value;
        setFahrenheit(value);
        setCelsius(value !== '' ? (parseFloat(value) - 32) * 5/9 : '');
    };

    return (
        <div className="home-container">
            <h1>ScanDish</h1>

            <div className="rectangle-grid">
                <div className="rectangle">
                    <h2>👋 Velkommen...</h2>
                </div>
            </div>

            <div className="temp-container">
                <h2>Temperature Converter</h2>
                <div>
                    <label>Celsius:</label>
                    <input type="number" value={celsius} onChange={handleCelsiusChange} />
                </div>
                <div>
                    <label>Fahrenheit:</label>
                    <input type="number" value={fahrenheit} onChange={handleFahrenheitChange} />
                </div>
            </div>
        </div>
    );
}
