import React, { useState, useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import Cropper from 'react-easy-crop';
import { AiOutlineCamera, AiOutlineFileImage } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import EXIF from 'exif-js';
import './ScreenStyle/Scan.css';
import { motion } from 'framer-motion';

const Scan = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [previousText, setPreviousText] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [displayedImage, setDisplayedImage] = useState(false);

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedText = localStorage.getItem('previousRecognizedText');
    if (storedText) {
      setPreviousText(storedText);
    }
  }, []);

  useEffect(() => {
    if (selectedImage) {
      recognizeText();
    }
  }, [selectedImage]);

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = async () => {
        EXIF.getData(img, function () {
          const orientation = EXIF.getTag(this, 'Orientation');
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const { width, height } = img;
          if (orientation === 6) {
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(90 * Math.PI / 180);
            ctx.drawImage(img, 0, -height);
          } else if (orientation === 8) {
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(-90 * Math.PI / 180);
            ctx.drawImage(img, -width, 0);
          } else if (orientation === 3) {
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(180 * Math.PI / 180);
            ctx.drawImage(img, -width, -height);
          } else {
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
          }

          const rotatedImageUrl = canvas.toDataURL('image/jpeg', 0.7);
          setSelectedImage(rotatedImageUrl);
          setDisplayedImage(true);
        });
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
      try {
        const result = await Tesseract.recognize(selectedImage, 'eng', {
          tessedit_char_blacklist: '!@#$%^&*()_+=-`',
        });
        const currentText = result.data.text;
        setRecognizedText(currentText);
        setPreviousText(currentText);
        localStorage.setItem('previousRecognizedText', currentText);
      } catch (error) {
        console.error('Error recognizing text:', error);
      }
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
    if (videoRef.current) {
      videoRef.current.play();
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
        <h1>Scan: Fremgangsmåte</h1>
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
          {previousText && (
            <div className="last-scan-container">
              <div className="textRec">Gjenkjent tekst </div>
              <p>{previousText}</p>
              <div>
                <button className="kopi-text" onClick={copyToClipboard}>Kopier tekst</button>
              </div>
              <Link
                to={{
                  pathname: "/Instructions",
                  state: { text: previousText }
                }}
                className="linkButton"
              >
                Legg til Fremgangsmåte
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
    </motion.div>
  );
};

export default Scan;
