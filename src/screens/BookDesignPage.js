import React, { useState, useRef, useEffect } from 'react';
import './ScreenStyle/BookDesign.css'; // Import your CSS file for styling
import { AiOutlineFontSize, AiOutlineFontColors, AiOutlineScan, AiOutlinePicture, AiOutlineUpCircle, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineSave, AiOutlineFileAdd } from 'react-icons/ai'; 

function BookDesign() {
    const [selectedFont, setSelectedFont] = useState('Arial');
    const [text, setText] = useState('');
    const [showFontOptions, setShowFontOptions] = useState(false);
    const canvasRef = useRef(null);

    const fontOptions = [
        { name: 'sans-serif', fontFamily: 'sans-serif' },
        { name: 'monospace',fontFamily: 'monospace'},
        { name: 'serif',fontFamily: 'serif'},

    ];

    const handleFontChange = (font) => {
        setSelectedFont(font);
        setShowFontOptions(false); 
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = `16px ${selectedFont}`;
        context.fillText(text, 10, 50); 
    }, [text, selectedFont]);

    const handleUpdate = async () => {
    };

    return (
        <div className="bookdesign-page">
            <h1>Design din bok</h1>
            <div className="bookdesign-content">
                <canvas id="myCanvas" ref={canvasRef} width="350" height="400" style={{ backgroundColor: 'white' }}></canvas>
                <div className="design-button-container">
                    <div className="font-button" onClick={() => setShowFontOptions(!showFontOptions)}>
                        <AiOutlineFontSize />
                        {showFontOptions && (
                            <div className="font-options-dropdown">
                                <ul>
                                    {fontOptions.map((font, index) => (
                                        <li key={index} onClick={() => handleFontChange(font.name)}>
                                            {font.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <button className="font-color-button"><AiOutlineFontColors /></button>
                    <button className="scan-button"><AiOutlineScan /></button>
                    <button className="picture-button"><AiOutlinePicture /></button>
                    <button className="symbol-button"><AiOutlineUpCircle /></button>
                </div>
            </div>
            <div className="text-input-container">
                <label htmlFor="textInput">Skriv inn tekst:</label>
                <input type="text" id="textInput" value={text} onChange={handleTextChange} />
            </div>
            <div className="navigate-button-container">
                <button className="back-button"><AiOutlineArrowLeft /></button>
                <button className="next-button"><AiOutlineArrowRight /></button>
                <button className="save-button" onClick={handleUpdate}>Lagre</button>
                <button className="add-page-button"><AiOutlineFileAdd /></button>
            </div>
        </div>
    );
}

export default BookDesign;
