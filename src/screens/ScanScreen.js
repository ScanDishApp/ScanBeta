// src/Scan.js
import React, { useState, useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import { AiOutlineCamera, AiOutlineFileImage, AiOutlineCopy } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './ScreenStyle/Scan.css';

const Scan = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [lastRecognizedText, setLastRecognizedText] = useState('');

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
    const MAX_DIMENSION = 800;
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

  return (
    <div className="scan-container">
      <h1>Scan</h1>
      <div className="rectangle-grid">
        <div className="icon-container">
          <span className="icon-text" onClick={openDefaultCameraApp}>
            <AiOutlineCamera /> Open Camera
          </span>
          <span className="icon-text" onClick={() => fileInputRef.current.click()}>
            <AiOutlineFileImage /> Choose Image
          </span>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <div className="image-container">
          {selectedImage && <img src={selectedImage} alt="Selected" />}
        </div>
        {recognizedText && (
          <div className="recognized-text">
            <h2>Recognized Text:</h2>
            <p>{recognizedText}</p>
            <button className="copy-button" onClick={copyToClipboard}>
              <AiOutlineCopy /> Copy to Clipboard
            </button>
          </div>
        )}
        {lastRecognizedText && (
          <div className="last-scan-container">
            <h2>Last Scan / Edit:</h2>
            <p>{lastRecognizedText}</p>
            <Link to="/newpage">Add to page</Link>
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
