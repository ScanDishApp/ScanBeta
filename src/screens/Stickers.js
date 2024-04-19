import React, { useState } from 'react';

// Import sticker images
import sticker1 from '../assets/Fruit/Apple.png';
// Import more stickers as needed

// Define sticker data with image source and unique ID
const stickerData = [
  { id: 1, src: sticker1 },
  // Add more stickers as needed
];

// CustomDropdown component with image previews
const CustomDropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <div className="selected-option" onClick={handleToggleDropdown}>
        {selectedOption ? (
          <img src={selectedOption.src} alt={`Selected Sticker`} />
        ) : (
          <span>Select an option</span>
        )}
      </div>
      {isOpen && (
        <ul className="options">
          {options.map((option) => (
            <li key={option.id} onClick={() => handleSelect(option)}>
              <img src={option.src} alt={`Sticker ${option.id}`} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Sticker component
const Sticker = () => {
  const [selectedSticker, setSelectedSticker] = useState(null);

  const handleStickerSelect = (selectedSticker) => {
    setSelectedSticker(selectedSticker);
    console.log('Selected sticker:', selectedSticker);
  };

  return (
    <div>
      <h1>Sticker Page</h1>
      <CustomDropdown options={stickerData} onSelect={handleStickerSelect} />
      {selectedSticker && (
        <div>
          <img src={selectedSticker.src} alt={`Selected Sticker`} style={{ width: '100px', height: '100px' }} />
        </div>
      )}
    </div>
  );
};

export default Sticker;
