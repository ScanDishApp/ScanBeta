// FontDropdown.js
import React from 'react';

const FontDropdown = ({ selectedFont, handleFontChange }) => {
    return (
        <select value={selectedFont} onChange={handleFontChange}>
            <option value="Roboto">Roboto</option>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
        </select>
    );
};

export default FontDropdown;
