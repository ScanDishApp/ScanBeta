import React, { useState, useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import './ScreenStyle/Scan.css'; // Import the external CSS file

const Scan = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    recognizeText();
  }, [selectedImage]);

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    setSelectedImage(URL.createObjectURL(image));
  };

  const handleButtonClick = () => {
    if (showCamera) {
      stopCamera();
    } else {
      startCamera();
    }
    setShowCamera(!showCamera);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setMediaStream(stream);
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
  };

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('image/png');
    setSelectedImage(imageDataUrl);
    stopCamera();
    setShowCamera(false);
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
        <button className="button" onClick={handleButtonClick}>
          {showCamera ? 'Close Camera' : 'Open Camera'}
        </button>
        <button className="button" onClick={() => fileInputRef.current.click()}>Choose File</button>
        {showCamera && (
          <div className="camera-preview">
            <video ref={videoRef} autoPlay muted />
            <button className="capture-button" onClick={captureImage}>Capture Image</button>
          </div>
        )}
        {selectedImage && <img src={selectedImage} alt="Selected" />}
        {recognizedText && (
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
