import React, { useState } from 'react';
import './ScreenStyle/Calculator.css';
import { AiOutlineCalculator } from 'react-icons/ai';



export default function Calculator() {
    const [inputValue, setInputValue] = useState('');
    const [fromUnit, setFromUnit] = useState('gram');
    const [toUnit, setToUnit] = useState('ounces');
    const [result, setResult] = useState('');

    const unitConversions = {
        gram: {
            ounces: 0.035274,
            pounds: 0.00220462,
            kilograms: 0.001,
            cup: 0.00422675,
            teskjeer: 0.2,
            spiseskjeer: 0.067628,
            milligram: 1000,
            desiliter: 0.1,
        },
        ounces: {
            gram: 28.3495,
            pounds: 0.0625,
            kilograms: 0.0283495,
            cup: 0.119826,
            teskjeer: 6,
            spiseskjeer: 1,
            milligram: 28349.5,
            desiliter: 0.295735,
        },
        pounds: {
            gram: 453.592,
            ounces: 16,
            kilograms: 0.453592,
            cup: 4.22675,
            teskjeer: 48,
            spiseskjeer: 3.38141,
            milligram: 453592,
            desiliter: 2.36588,
        },
        kilograms: {
            gram: 1000,
            ounces: 35.274,
            pounds: 2.20462,
            cup: 4.22675,
            teskjeer: 202.884,
            spiseskjeer: 14.7868,
            milligram: 1000000,
            desiliter: 10,
        },
        cup: {
            gram: 236.588,
            ounces: 8.32674,
            pounds: 0.236588,
            teskjeer: 48,
            kilograms: 0.236588,
            spiseskjeer: 16,
            milligram: 236588,
            desiliter: 0.236588,
        },
        teskjeer: {
            gram: 5,
            ounces: 0.166667,
            pounds: 0.0104167,
            cup: 0.0208333,
            kilograms: 0.005,
            spiseskjeer: 0.333333,
            milligram: 5000,
            desiliter: 0.05,
        },
        milligram: {
            gram: 0.001,
            ounces: 0.000035274,
            pounds: 0.00000220462,
            cup: 0.00000422675,
            teskjeer: 0.0002,
            kilograms: 0.000001,
            spiseskjeer: 0.000067628,
            desiliter: 0.0001,
        },
        spiseskjeer: {
            gram: 14.7868,
            ounces: 0.5,
            pounds: 0.0625,
            cup: 0.0625,
            teskjeer: 3,
            milligram: 14786.8,
            kilograms: 0.0147868,
            desiliter: 0.15,
        },
        desiliter: {
            gram: 100,
            ounces: 3.38141,
            pounds: 0.220462,
            cup: 1.05669,
            teskjeer: 20,
            milligram: 100000,
            spiseskjeer: 6.66667,
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
            setResult('Ugyldig verdi');
        }
    };

    

    return (
        <div className="home-container">
            <div className="rectangle-grid">
                <div className="rectangle">
                    <h2>
  Mengde og vekt kalkulator.
      </h2>
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
                    <button onClick={convertUnits}>Konverter</button>
                </div>
                <div className="result-container">
                    <span className="result">{result}</span>
                </div>
            </div>
        </div>
    );
}
