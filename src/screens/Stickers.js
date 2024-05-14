import React, { useState } from 'react';
import { AiOutlineSmile, AiOutlineRight } from 'react-icons/ai';
import Draggable from 'react-draggable';
import './ScreenStyle/Sticker.css';

import apple from '../assets/Fruit/Apple.png';
import banana from '../assets/Fruit/Banana.png';
import blueberry from '../assets/Fruit/Blueberry.png';
import lemon from '../assets/Fruit/Lemon.png';
import strawberry from '../assets/Fruit/Strawberry.png';
import orange from '../assets/Fruit/Orange.png';
import grape from '../assets/Fruit/Grape.png';

const Sticker = ({ addSticker }) => {
  const [selectedStickers, setSelectedStickers] = useState([]);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const emojiData = [
    { id: 1, src: apple },
    { id: 2, src: banana },
    { id: 3, src: blueberry },
    { id: 4, src: orange },
    { id: 5, src: lemon },
    { id: 6, src: strawberry },
    { id: 7, src: grape },
  ];

  const handleStickerClick = (src) => {
    const stickerExists = selectedStickers.find((sticker) => sticker.src === src);

    if (!stickerExists) {
        
        addSticker(src);
    }
};

  const handleDrag = (e, index) => {
    const { x, y } = e;
    const updatedStickers = [...selectedStickers];
    updatedStickers[index].position = { x, y };
    setSelectedStickers(updatedStickers);
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className="sticker-menu-container">
      <div className="toggle-menu" onClick={toggleMenu}>
        <AiOutlineRight className="sticker-icon" />
      </div>

      {isMenuVisible && (
        <div className="sticker-menu">
          {emojiData.map((sticker) => (
            <img
              key={sticker.id}
              src={sticker.src}
              alt={`Sticker ${sticker.id}`}
              className={`sticker-item`}
              onClick={() => handleStickerClick(sticker.src)}
            />
          ))}
        </div>
      )}

      <div className="selected-stickers-container">
        {selectedStickers.map((sticker, index) => (
          <Draggable
            key={sticker.id}
            onStop={(e, data) => handleDrag(data, index)}
            defaultPosition={sticker.position}
          >
            <div className="selected-sticker">
              <img src={sticker.src} alt="Selected Sticker" />
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default Sticker;