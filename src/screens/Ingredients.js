import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import './ScreenStyle/NoteTaker.css';

const Ingredients = forwardRef(({ value, selectedColor, selectedFont }, ref) => {
  const [note, setNote] = useState(value || ''); // Initialize with value prop or empty string
  const textareaRef = useRef(null);

  const handleNoteChange = (event) => {
    const newIngridens = event.target.value;
    const lines = newIngridens.split('\n');
    const bulletLines = lines.map(line => {
      if (line.trim() && !line.trim().startsWith('\u2022')) {
        return `\u2022 ${line}`;
      }
      return line;
    });
    setNote(bulletLines.join('\n'));
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const resetTextArea = () => {
    setNote('');
    adjustTextareaHeight();
    localStorage.removeItem("lastRecognizedText")
  };

  useImperativeHandle(ref, () => ({
    resetTextArea,
  }));

  useEffect(() => {
    const lastText = localStorage.getItem('lastRecognizedText');
    if (lastText) {
      setNote(lastText);
      adjustTextareaHeight();
    } else {
      setNote(value);
      adjustTextareaHeight();
    }

  }, [value]);



  return (
    <div className="note-taker-container">
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
});

export default Ingredients;
