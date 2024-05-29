import React, { useState } from 'react';
import { AiOutlineRight, AiOutlineDelete } from 'react-icons/ai';
import Draggable from 'react-draggable';
import '../screens/ScreenStyle/Sticker.css';

import apple from '../assets/Fruit/Apple.png';
import banana from '../assets/Fruit/Banana.png';
import blueberry from '../assets/Fruit/Blueberry.png';
import lemon from '../assets/Fruit/Lemon.png';
import strawberry from '../assets/Fruit/Strawberry.png';
import orange from '../assets/Fruit/Orange.png';
import grape from '../assets/Fruit/Grape.png';
import watermelone from '../assets/Fruit/Watermelon.png'
import pumkin from '../assets/Fruit/Pumkin.png'
import pear from '../assets/Fruit/Pear.png'
import lime from '../assets/Fruit/Lime.png'
import rasberry from '../assets/Fruit/Rasberry.png'
import cherry from '../assets/Fruit/Cherry.png'
import kiwi from '../assets/Fruit/Kiwi.png'
import girl from '../assets/Fruit/Girl.png'
import dude from '../assets/Fruit/Dude.png'
import oldman from '../assets/Fruit/OldMan.png'
import granny from '../assets/Fruit/Granny.png'
import slime from '../assets/Fruit/slime.png'
import slimeB from '../assets/Fruit/slimeB.png'
import logo from '../assets/Fruit/logo.png'


const Sticker = ({ addSticker }) => {
  const [selectedStickers, setSelectedStickers] = useState([]);
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [editModeId, setEditModeId] = useState(null);

  const emojiData = [
    { id: 1, src: apple },
    { id: 2, src: banana },
    { id: 3, src: blueberry },
    { id: 4, src: orange },
    { id: 5, src: lemon },
    { id: 6, src: strawberry },
    { id: 7, src: grape },
    { id: 8, src: watermelone },
    { id: 9, src: pumkin },
    { id: 10, src: pear },
    { id: 11, src: lime },
    { id: 12, src: rasberry },
    { id: 13, src: cherry },
    { id: 14, src: kiwi },
    { id: 15, src: girl },
    { id: 16, src: dude },
    { id: 17, src: oldman },
    { id: 18, src: granny },
    { id: 19, src: slime },
    { id: 20, src: slimeB },
    { id: 21, src: logo },
  ];

  const handleStickerClick = (src) => {
    addSticker(src);
  };

  const handleDrag = (e, index) => {
    const { x, y } = e;
    const updatedStickers = [...selectedStickers];
    updatedStickers[index].position = { x, y };
    setSelectedStickers(updatedStickers);
  };

  const handleDelete = (id) => {
    const updatedStickers = selectedStickers.filter((sticker) => sticker.id !== id);
    setSelectedStickers(updatedStickers);
    setEditModeId(null); 
  };

  const toggleEditMode = (id) => {
    setEditModeId(editModeId === id ? null : id);  
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
            <div
              className="selected-sticker"
              onClick={() => toggleEditMode(sticker.id)}
              onTouchStart={() => toggleEditMode(sticker.id)}
            >
              <img src={sticker.src} alt="Selected Sticker" />
              {editModeId === sticker.id && (
                <AiOutlineDelete
                  className="delete-icon-edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(sticker.id);
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation(); 
                    handleDelete(sticker.id);
                  }}
                />
              )}
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default Sticker;
