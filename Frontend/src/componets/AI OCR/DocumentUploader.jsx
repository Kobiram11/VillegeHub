import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import '../../Styles/DocumentUploader.css';  // Importing the custom CSS for styling

const DocumentUploader = ({ onDataExtracted }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    setLoading(true);

    Tesseract.recognize(file, 'eng', {
      logger: m => console.log(m),
    }).then(({ data: { text } }) => {
      setLoading(false);
      // simulate extracting specific info
      const extractedData = {
        name: text.match(/Name:\s*(.*)/)?.[1] || '',
        nic: text.match(/NIC:\s*(.*)/)?.[1] || '',
        dob: text.match(/DOB:\s*(.*)/)?.[1] || '',
      };
      onDataExtracted(extractedData);
    });
  };

  return (
    <div className="document-uploader">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="upload-input"
      />
      {loading && <p className="loading-text">Processing with AI...</p>}
      {image && <img src={image} alt="Uploaded" className="uploaded-image" />}
    </div>
  );
};

export default DocumentUploader;
