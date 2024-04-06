import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import './ScreenStyle/Scan.css'; // Import the external CSS file

const Scan = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    setSelectedImage(URL.createObjectURL(image));
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleCameraButtonClick = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = mediaStream;
      video.play();

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      video.addEventListener('loadeddata', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/png');
        setSelectedImage(imageDataUrl);
        mediaStream.getTracks().forEach(track => track.stop());
      });
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const recognizeText = async () => {
    if (selectedImage) {
      const result = await Tesseract.recognize(selectedImage);
      setRecognizedText(result.data.text);
    }
  };

  return (
    <div className="scan-container">
      <h1>ScanScreen</h1>
      <div className="rectangle-grid">
        <div className="rectangle">
          <h2>⚙️ Scan...</h2>
        </div>
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          style={{ display: 'none' }} // Hide the file input
        />
        <button className="button" onClick={handleButtonClick}>Choose File</button>
        <button className="button" onClick={handleCameraButtonClick}>Open Camera</button>
        {selectedImage && <img src={selectedImage} alt="Selected" />}
        {selectedImage && (
          <div>
            <h2>Recognized Text:</h2>
            <p>{recognizedText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scan;
