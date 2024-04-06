import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import './ScreenStyle/Scan.css'; // Import the external CSS file

const Scan = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const handleImageUpload = async (event) => {
    const image = event.target.files[0];
    setSelectedImage(URL.createObjectURL(image));

    const reader = new FileReader();
    reader.onload = async () => {
      const imageData = reader.result;
      const result = await Tesseract.recognize(imageData);
      setRecognizedText(result.data.text);
    };
    reader.readAsDataURL(image);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleCameraScan = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    }
  };

  const captureImage = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg');
    setSelectedImage(imageData);
    const result = await Tesseract.recognize(imageData);
    setRecognizedText(result.data.text);
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
        <button className="button" onClick={handleCameraScan}>Scan with Camera</button>
        <button className="button" onClick={captureImage}>Capture Image</button>
        {selectedImage && <img src={selectedImage} alt="Selected" />}
        {recognizedText && (
          <div>
            <h2>Recognized Text:</h2>
            <p>{recognizedText}</p>
          </div>
        )}
        <video ref={videoRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default Scan;
