import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import image1 from '../assets/Info/1.png';
import image2 from '../assets/Info/2.png';
import image3 from '../assets/Info/3.png';
import image4 from '../assets/Info/4.png';
import image5 from '../assets/Info/5.png';
import image6 from '../assets/Info/6.png';
import image7 from '../assets/Info/7.png';
import image8 from '../assets/Info/8.png';


import '../screens/ScreenStyle/InfoCarousel.css'; 
import { AiFillInfoCircle, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'; 

const InfoCarousel = () => {
  const images = [image1, image2, image3, image4, image5, image6, image7, image8];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate(); 

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goBack = () => {
    navigate(-1); 
  };

  const goHome = () => {
    navigate('/Home'); 
  };

  return (
    <div className='hero-button'>
      <div className="button-wrapper">
        <button onClick={goBack} className="nav-button">
        Tilbake
        </button>
        <button onClick={goHome} className="nav-button">
        Hjem 
        </button>
      </div>
      <div className="info-carousel">
        <h2 className='info-header'>
          <AiFillInfoCircle className='info-icon' /> Informasjon
        </h2>
        <div className="overlay"></div>
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
