import React, { useState, useEffect, useRef } from 'react';
import './ScreenStyle/NoteTaker.css';

const Ingredients = ({ selectedColor, selectedFont }) => {
  const [note, setNote] = useState('');
  const [lastRecognizedText, setLastRecognizedText] = useState('');
  const textareaRef = useRef(null);

  const handleNoteChange = (event) => {
    const inputValue = event.target.value;
    const formattedValue = formatText(inputValue); 
    setNote(formattedValue);
    adjustTextareaHeight(); 
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; 
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; 
    }
  };

  const formatText = (text) => {
    
    const formattedText = text.replace(/^- (.*)/gm, '• $1');
    return formattedText;
  };

  useEffect(() => {
    const lastText = localStorage.getItem('lastRecognizedText');
    if (lastText) {
      setLastRecognizedText(lastText);
      setNote(lastText); 
      adjustTextareaHeight(); 
    }
  }, []); 

  useEffect(() => {
    localStorage.setItem('lastRecognizedText', note);
  }, [note]); 

  return (
    <div className="note-taker-container" style={{ height: '100px' }}>
      <textarea 
        ref={textareaRef}
        className="note-input"
        value={note}
        onChange={handleNoteChange}
        placeholder="Skriv din tekst her ..."
        style={{ fontFamily: selectedFont, color: selectedColor }} 
      />
    </div>
  );
};

export default Ingredients;
