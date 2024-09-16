import React, { useState } from 'react';
import ImageList from './ImageList';

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch('http://localhost:5001/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        setMessage(data.message || data.error);
      } catch (error) {
        setMessage(`An error occurred while uploading the file. ${error}`);
      }
    } else {
      setMessage('No file selected');
    }
  };

  return (
    <div>
      <h2>Upload PNG</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".png"
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
      
      <ImageList />
    </div>
  );
}

export default UploadPage;