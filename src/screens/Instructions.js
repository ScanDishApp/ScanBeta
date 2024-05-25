import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import './ScreenStyle/NoteTaker.css'; 

const Instructions = forwardRef(({ value, selectedColor, selectedFont }, ref) => {
  const [note, setNote] = useState(value || '');
  const textareaRefIns = useRef(null);

  const handleNoteChange = (event) => {
    let inputValue = event.target.value;
    const formattedValue = formatText(inputValue);
    setNote(formattedValue);
    adjustTextareaHeight(); 
  };

  const adjustTextareaHeight = () => {
    if (textareaRefIns.current) {
      textareaRefIns.current.style.height = 'auto'; 
      textareaRefIns.current.style.height = `${textareaRefIns.current.scrollHeight}px`; 
    }
  };
  
  const resetTextArea = () => {
    setNote('');
    adjustTextareaHeight();
    localStorage.removeItem("previousRecognizedText")
  };

  useImperativeHandle(ref, () => ({
    resetTextArea,
  }));

  const formatText = (text) => {
    const formattedText = text.replace(/^- (.*)/gm, '• $1'); 
    return formattedText;
  };

  useEffect(() => {
    const lastText = localStorage.getItem('previousRecognizedText');
    if (lastText) {
      setNote(lastText);
      adjustTextareaHeight(); 
    }else {
      setNote(value);
      adjustTextareaHeight();
    }
  }, [value]); 

  return (
    <div className="note-taker-container">
      <textarea
        ref={textareaRefIns}
        className="note-input-ins"
        value={note}
        onChange={handleNoteChange}
        placeholder="Skriv din tekst her ..."
        style={{ fontFamily: selectedFont, color: selectedColor}} 
      />
    </div>
  );
});

export default Instructions;
