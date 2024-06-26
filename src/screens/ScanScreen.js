import React, { useState, useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import { AiOutlineCamera, AiOutlineFileImage, AiOutlineArrowRight } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import Cropper from 'react-easy-crop';
import { motion } from 'framer-motion';
import divider from '../assets/divider.png';

import './ScreenStyle/Scan.css';

const Scan = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [lastRecognizedText, setLastRecognizedText] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [displayedImage, setDisplayedImage] = useState(false);

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

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

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > 1024) {
            height *= 1024 / width;
            width = 1024;
          }
        } else {
          if (height > 1024) {
            width *= 1024 / height;
            height = 1024;
          }
        }
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const transformedImage = canvas.toDataURL('image/jpeg', 1.0);

        setSelectedImage(transformedImage);
        setDisplayedImage(true);
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(image);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = selectedImage;

    image.onload = () => {
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      const croppedImageUrl = canvas.toDataURL('image/jpeg', 0.7);
      setSelectedImage(croppedImageUrl);
      setIsCropping(false);
    };
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

  const handleRetryCapture = () => {
    setSelectedImage(null);
    setDisplayedImage(false);
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
    if (videoRef.current && videoRef.current.readyState === 4) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/png');
      setSelectedImage(imageDataUrl);
      setDisplayedImage(true);
    }
  };

  const handleCropButtonClick = () => {
    setIsCropping(true);
  };

  const handleFinishCrop = () => {
    cropImage();
  };

  return (
    <motion.div
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <div className="scan-container">
        <AiOutlineArrowRight className="back-btn" onClick={() => navigate(-1)} />
        <h1 className='scan-header'>Skann: Ingredienser</h1>
        <img src={divider} alt="Divider" style={{ maxHeight: '50px' }} />
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
          <div className="image-container">
            {selectedImage && displayedImage && !isCropping && <img src={selectedImage} alt="Selected" />}
          </div>
          {isCropping && (
            <div className="crop-container">
              <Cropper
                image={selectedImage}
                crop={crop}
                zoom={zoom}
                aspect={16 / 20}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                classes={{
                  containerClassName: 'custom-container',
                  mediaClassName: 'custom-media',
                  cropAreaClassName: 'custom-crop-area',
                  cropButtonClassName: 'custom-crop-button',
                }}
              />
              <h2 className="crop-header"> - Crop bildet -</h2>
              <button className="finish-crop-button" onClick={handleFinishCrop}>Fulfør</button>
            </div>
          )}
          <div className="func-buttons">
            {displayedImage && !isCropping && (
              <React.Fragment>
                <button className="crop-button" onClick={handleCropButtonClick}>
                  Crop bildet
                </button>
                <button className="crop-button" onClick={() => setSelectedImage(null)}>Fjern bildet</button>
              </React.Fragment>
            )}
          </div>
          {lastRecognizedText && (
            <div className="last-scan-container">
              <div className="textRec">Gjenkjent tekst </div>
              <p>{lastRecognizedText}</p>
              <div>
                <button className="kopi-text" onClick={copyToClipboard}>Kopier tekst</button>
              </div>
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
          {!selectedImage && !displayedImage && (
            <button className="retry-button" onClick={handleRetryCapture}>
              Prøv Igjen
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Scan;
