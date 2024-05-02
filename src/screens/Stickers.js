import React, { useState } from 'react'

import apple from '../assets/Fruit/Apple.png'
import banana from '../assets/Fruit/Banana.png'
import blueberry from '../assets/Fruit/Blueberry.png'
import cherry from '../assets/Fruit/Cherry.png'
import grape from '../assets/Fruit/Grape.png'
import kiwi from '../assets/Fruit/Kiwi.png'
import lemon from '../assets/Fruit/Lemon.png'
import lime from '../assets/Fruit/Lime.png'
import orange from '../assets/Fruit/Orange.png'
import pear from '../assets/Fruit/Pear.png'
import rasberry from '../assets/Fruit/Rasberry.png'
import strawberry from '../assets/Fruit/Strawberry.png'
import watermelon from '../assets/Fruit/Watermelon.png'
const EmojiPicker = ({ onSelect }) => {
const [selectedEmoji, setSelectedEmoji] = useState(null);

  const emojiData = [
    { id: 1, src: apple },
    { id: 1, src: banana },
    { id: 1, src: blueberry },
    { id: 1, src: cherry },
    { id: 1, src: grape },
    { id: 1, src: kiwi },
    { id: 1, src: lemon },
    { id: 1, src: lime },
    { id: 1, src: orange },
    { id: 1, src: pear },
    { id: 1, src: rasberry },
    { id: 1, src: watermelon },
    { id: 1, src: strawberry },
    
  ];

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
    onSelect(emoji);
  };

  return (
    <div className="emoji-picker" >
      {emojiData.map((emoji, index) => (
        <img key={index} 
        src={emoji.src} 
        alt={`Emoji ${emoji.id}`} 
        onClick={() => handleEmojiClick(emoji)} 
        style={{ maxWidth: '50px', maxHeight: '50px' }}/>
      ))}
    </div>
  );
};

export default EmojiPicker;
