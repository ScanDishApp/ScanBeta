import React, { useState } from 'react';
import './ScreenStyle/Calculator.css';

export default function Calculator() {
    const [inputValue, setInputValue] = useState('');
    const [fromUnit, setFromUnit] = useState('grams');
    const [toUnit, setToUnit] = useState('ounces');
    const [result, setResult] = useState('');

    const unitConversions = {
        grams: {
            ounces: 0.035274,
            pounds: 0.00220462,
            kilograms: 0.001,
        },
        ounces: {
            grams: 28.3495,
            pounds: 0.0625,
            kilograms: 0.0283495,
        },
        pounds: {
            grams: 453.592,
            ounces: 16,
            kilograms: 0.453592,
        },
        kilograms: {
            grams: 1000,
            ounces: 35.274,
            pounds: 2.20462,
        },
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleFromUnitChange = (e) => {
        setFromUnit(e.target.value);
    };

    const handleToUnitChange = (e) => {
        setToUnit(e.target.value);
    };

    const convertUnits = () => {
        const inputValueFloat = parseFloat(inputValue);
        if (!isNaN(inputValueFloat)) {
            const conversionFactor = unitConversions[fromUnit][toUnit];
            setResult((inputValueFloat * conversionFactor).toFixed(2));
        } else {
            setResult('Invalid input');
        }
    };

    return (
            <div className="home-container">
                <h1>ScanDish</h1>
        
                <div className="rectangle-grid">
                    <div className="rectangle">
                        <h2>👋 Food unit converter...</h2>
                    </div>
        
                    <div className="converter-container">
                        <label>
                            Quantity:
                            <input type="text" value={inputValue} onChange={handleInputChange} />
                        </label>
                        <label>
                            From:
                            <select value={fromUnit} onChange={handleFromUnitChange}>
                                {Object.keys(unitConversions).map((unit) => (
                                    <option key={unit} value={unit}>
                                        {unit}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            To:
                            <select value={toUnit} onChange={handleToUnitChange}>
                                {Object.keys(unitConversions).map((unit) => (
                                    <option key={unit} value={unit}>
                                        {unit}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button onClick={convertUnits}>Convert</button>
                    </div>
                    <div className="result-container">
                       <span className="result">{result}</span>
                    </div>
                </div>
            </div>
    );
}
