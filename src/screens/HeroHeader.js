import React from 'react';
import './ScreenStyle/Header.css';
import logo from '../assets/Logo.png'

const HeroHeader = () => {
  return (
    <header className="header">
      <div className="logo">
      <img src={logo} alt="Logo"style={{  maxHeight: '40px' }}/>
      </div>
    </header>
  );
};

export default HeroHeader;
