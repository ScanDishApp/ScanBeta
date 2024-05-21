import React, { useState, useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import Cropper from 'react-easy-crop';
import { AiOutlineCamera, AiOutlineFileImage } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './ScreenStyle/Scan.css';

const Scan = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [lastRecognizedText, setLastRecognizedText] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);

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
        setSelectedImage(e.target.result);
        setIsCropping(true);
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
    setIsCropping(true);
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
        <div className="image-container">
          {selectedImage && !isCropping && <img src={selectedImage} alt="Selected" />}
        </div>
        {isCropping && (
          <div className="crop-container">
            <Cropper
              image={selectedImage}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <button className="crop-button" onClick={cropImage}>Finish Crop</button>
          </div>
        )}
        {lastRecognizedText && (
          <div className="last-scan-container">
            <div className="textRec">Gjenkjent tekst </div>
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
