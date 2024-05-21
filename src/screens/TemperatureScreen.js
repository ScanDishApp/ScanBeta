import React, { useState } from 'react';
import './ScreenStyle/Temp.css';
import { AiOutlineCalculator} from 'react-icons/ai';


export default function TemperatureConverter() {
    const [inputValue, setInputValue] = useState('');
    const [fromUnit, setFromUnit] = useState('Celsius');
    const [toUnit, setToUnit] = useState('Fahrenheit');
    const [result, setResult] = useState('');

    const temperatureConversions = {
        Celsius: {
            Fahrenheit: (celsius) => (celsius * 9 / 5) + 32,
        },
        Fahrenheit: {
            Celsius: (fahrenheit) => (fahrenheit - 32) * 5 / 9,
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

    const convertTemperature = () => {
        const inputValueFloat = parseFloat(inputValue);
        if (!isNaN(inputValueFloat)) {
            const conversionFunction = temperatureConversions[fromUnit][toUnit];
            const convertedValue = conversionFunction(inputValueFloat).toFixed(2);
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
 Temperatur kalkulator.
      </h2>               
       </div>
                <div className="converter-container">
                    <label>
                        Temperatur:
                        <input type="text" value={inputValue} onChange={handleInputChange} />
                    </label>
                    <label>
                        Fra:
                        <select value={fromUnit} onChange={handleFromUnitChange}>
                            <option value="Celsius">Celsius</option>
                            <option value="Fahrenheit">Fahrenheit</option>
                        </select>
                    </label>
                    <label>
                        Til:
                        <select value={toUnit} onChange={handleToUnitChange}>
                            <option value="Celsius">Celsius</option>
                            <option value="Fahrenheit">Fahrenheit</option>
                        </select>
                    </label>
                    <button onClick={convertTemperature}>Konvertere</button>
                </div>
                <div className="result-container">
                    <span className="result">{result}</span>
                </div>
            </div>
        </div>
    );
}
