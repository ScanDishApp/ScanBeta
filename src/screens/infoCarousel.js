import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import image1 from '../assets/Info/broken.jpg';
import image2 from '../assets/Info/purple.jpg';
import image3 from '../assets/Info/step.png';


import './ScreenStyle/InfoCarousel.css'; 
import { AiFillInfoCircle, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'; 

const InfoCarousel = () => {
  const images = [image1, image2, image3];
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

    console.log("Back button clicked");
    navigate(-1); // back 1 gang
  };

  const goHome = () => {
    // Navigate to a specific route when "Home" button is clicked
    console.log("Home button clicked");
    navigate('/Home'); // hjem
  };

  return (
    <div className='hero-button'>
      <div className="button-wrapper">
        <button onClick={goBack} className="nav-button">
          <AiOutlineArrowLeft /> Back
        </button>
        <button onClick={goHome} className="nav-button">
          <AiOutlineArrowRight /> Home
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
