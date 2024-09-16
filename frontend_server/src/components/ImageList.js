import React, { useState, useEffect } from 'react';

function ImageList() {
  const [images, setImages] = useState([]);
  const [processedText, setProcessedText] = useState('Nothing processed yet');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/images`);
      console.log('fetchImages response:', response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('fetchImages data:', data);
      setImages(data.images);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleImageClick = async (imageName) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/process_image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: imageName }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProcessedText(data.text);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  return (
    <div>
      <h2>Uploaded Images</h2>
      <ul>
        {images.map((image, index) => (
          <li key={index}>
            <button onClick={() => handleImageClick(image)}>{image}</button>
          </li>
        ))}
      </ul>
      {processedText && (
        <div>
          <h3>Processed Text:</h3>
          <pre>{processedText}</pre>
        </div>
      )}
    </div>
  );
}

export default ImageList;