import React, { useState, useRef } from 'react';

const PaperEnhancer = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [enhancedUrl, setEnhancedUrl] = useState('');
  const inputRef = useRef(null);

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setImageUrl(event.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Function to enhance paper whiteness
  const enhancePaperWhiteness = () => {
    if (imageUrl) {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0);

        // Get the image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Adjust brightness and contrast to enhance paper whiteness
        for (let i = 0; i < data.length; i += 4) {
          // Increase brightness and contrast (adjust these values as needed)
          data[i] += 50; // R
          data[i + 1] += 50; // G
          data[i + 2] += 50; // B
        }

        // Put the modified image data back onto the canvas
        ctx.putImageData(imageData, 0, 0);

        // Convert canvas to data URL and set as enhancedUrl state
        const enhancedImageUrl = canvas.toDataURL('image/jpeg');
        setEnhancedUrl(enhancedImageUrl);
      };

      img.src = imageUrl;
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} ref={inputRef} />
      <button onClick={enhancePaperWhiteness}>Enhance Paper Whiteness</button>

      {enhancedUrl && (
        <div>
          <h3>Enhanced Image</h3>
          <img src={enhancedUrl} alt="Enhanced Image" />
        </div>
      )}
    </div>
  );
};

export default PaperEnhancer;
