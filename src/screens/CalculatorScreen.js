import React, { useState } from 'react';
import './ScreenStyle/Calculator.css';

export default function Calculator() {
    const [inputValue, setInputValue] = useState('');
    const [fromUnit, setFromUnit] = useState('gram');
    const [toUnit, setToUnit] = useState('ounces');
    const [result, setResult] = useState('');

    const unitConversions = {
        gram: {
            ounces: 0.035274,
            pounds: 0.00220462,
            kilogras: 0.001,
        },
        ounces: {
            gram: 28.3495,
            pounds: 0.0625,
            kilogram: 0.0283495,
        },
        pounds: {
            gram: 453.592,
            ounces: 16,
            kilogram: 0.453592,
        },
        kilogram: {
            gram: 1000,
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
            const convertedValue = (inputValueFloat * conversionFactor).toFixed(2);
            setResult(`${convertedValue} ${toUnit}`); 
        } else {
            setResult('Invalid input');
        }
    };

    return (
        <div className="home-container">
            <div className="rectangle-grid">
                <div className="rectangle">
                    <h2>🧂 Mengde og vekt kalkulator.</h2>
                </div>
                <div className="converter-container">
                    <label>
                        Mengde:
                        <input type="text" value={inputValue} onChange={handleInputChange} />
                    </label>
                    <label>
                        Fra:
                        <select value={fromUnit} onChange={handleFromUnitChange}>
                            {Object.keys(unitConversions).map((unit) => (
                                <option key={unit} value={unit}>
                                    {unit}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Til:
                        <select value={toUnit} onChange={handleToUnitChange}>
                            {Object.keys(unitConversions).map((unit) => (
                                <option key={unit} value={unit}>
                                    {unit}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button onClick={convertUnits}>Regn om</button>
                </div>
                <div className="result-container">
                    <span className="result">{result}</span>
                </div>
            </div>
        </div>
    );
}
