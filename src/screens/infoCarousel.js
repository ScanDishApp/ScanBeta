import React, { useState } from 'react';
import image1 from '../assets/Info/broken.jpg';
import image2 from '../assets/Info/purple.jpg';
import image3 from '../assets/Info/step.png';

import './ScreenStyle/InfoCarousel.css'; // Import CSS file
import {AiFillInfoCircle, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'; // Import icons

const InfoCarousel = () => {
  const images = [image1, image2, image3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goBack = () => {
    // Logic for "Back" button
    console.log("Back button clicked");
  };

  const goHome = () => {
    // Logic for "Home" button
    console.log("Home button clicked");
  };

  return (
    <div className='hero-button'>
      <div className="button-wrapper">
        <button onClick={goBack} className="nav-button">Back</button>
        <button onClick={goHome} className="nav-button">Home</button>
      </div>
      <div className="info-carousel">
      <h2 className='info-header'>
          <AiFillInfoCircle className='info-icon' /> Informasjon
        </h2>        <div className="overlay"></div> {/* Overlay covering the entire screen */}
        <div className="image-container">
          <img
            src={images[currentImageIndex]}
            alt="carousel-img"
            className="image-transition"
          />
        </div>
        <div className="button-container">
          <button onClick={prevImage}>
            <AiOutlineArrowLeft />
          </button>
          <button onClick={nextImage}>
            <AiOutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoCarousel;
