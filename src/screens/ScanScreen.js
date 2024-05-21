import React, { useState, useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import { AiOutlineCamera, AiOutlineFileImage } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './ScreenStyle/Scan.css';

const Scan = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [lastRecognizedText, setLastRecognizedText] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const lastText = localStorage.getItem('lastRecognizedText');
    if (lastText) {
      setLastRecognizedText(lastText);
    }
  }, []);

  useEffect(() => {
    recognizeText();
  }, [selectedImage]);

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const img = new Image();
      img.onload = async () => {
        const preprocessedImage = await preprocessImage(img);
        setSelectedImage(preprocessedImage);
      };

      img.src = e.target.result;
    };
    reader.readAsDataURL(image);
  };

  const preprocessImage = async (image) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const MAX_DIMENSION = 1200;
    let width = image.width;
    let height = image.height;

    if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
      if (width > height) {
        height *= MAX_DIMENSION / width;
        width = MAX_DIMENSION;
      } else {
        width *= MAX_DIMENSION / height;
        height = MAX_DIMENSION;
      }
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, width, height);

    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.7);
    return imageDataUrl;
  };

  const recognizeText = async () => {
    if (selectedImage) {
      const result = await Tesseract.recognize(selectedImage, 'eng', {
        tessedit_char_blacklist: '!@#$%^&*()_+=-`',
      });
      const currentText = result.data.text;

      setRecognizedText(currentText);
      setLastRecognizedText(currentText);
      localStorage.setItem('lastRecognizedText', currentText);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(recognizedText);
    alert('Text copied to clipboard!');
  };

  const openDefaultCameraApp = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('capture', 'environment');
    input.click();
    input.addEventListener('change', (event) => {
      handleImageUpload(event);
    });
  };

  const captureImage = () => {
    videoRef.current.play();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('image/png');
    setSelectedImage(imageDataUrl);
  };

  const handleCropImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const { x, y, width, height } = crop;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(selectedImage, x, y, width, height, 0, 0, width, height);
    const croppedImageUrl = canvas.toDataURL('image/png');
    setSelectedImage(croppedImageUrl);
    setCrop({ x: 0, y: 0, width: 0, height: 0 }); // Reset crop
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event) => {
    const newWidth = event.pageX - crop.x;
    const newHeight = event.pageY - crop.y;
    setCrop((prevCrop) => ({
      ...prevCrop,
      width: newWidth > 0 ? newWidth : 0,
      height: newHeight > 0 ? newHeight : 0,
    }));
  };

  const handleMouseDown = (event) => {
    const { pageX, pageY } = event;
    setCrop((prevCrop) => ({
      ...prevCrop,
      x: pageX,
      y: pageY,
      width: 0,
      height: 0,
    }));
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="scan-container">
      <h1>Scan: Ingredienser</h1>
      <div className="rectangle-grid">
        <div className="icon-container">
          <span className="icon-text" onClick={openDefaultCameraApp}>
            <AiOutlineCamera /> Åpne Kamera
          </span>
          <span className="icon-text" onClick={() => fileInputRef.current.click()}>
            <AiOutlineFileImage /> Velg bildet 
          </span>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <div className="image-container" onMouseDown={handleMouseDown}>
          {selectedImage && (
            <>
              <img src={selectedImage} alt="Selected" />
              {crop.width > 0 && crop.height > 0 && (
                <div
                  className="crop-overlay"
                  style={{
                    left: crop.x,
                    top: crop.y,
                    width: crop.width,
                    height: crop.height,
                  }}
                />
              )}
            </>
          )}
        </div>
        <button className="crop-button" onClick={handleCropImage}>
          Crop Image
        </button>
        {lastRecognizedText && (
          <div className="last-scan-container">
            <div className='textRec'>Gjenkjent tekst </div>        
            <p>{lastRecognizedText}</p>
            <Link
              to={{
                pathname: "/Ingredients",
                state: { lastRecognizedText }
              }}
              className="linkButton"
            >
              Legg til Ingredienser
            </Link>
          </div>
        )}
        {videoRef.current && (
          <div className="camera-preview">
            <video ref={videoRef} autoPlay muted />
            <button className="capture-button" onClick={captureImage}>
              Capture Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scan;
