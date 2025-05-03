import React, { useState } from 'react';
import axios from 'axios';

const OCRUploader = ({ onAutoFill }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setError('');
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append('document', file);

      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { data } = response;

      if (data && data.success) {
        console.log('✅ OCR data:', data.data);
        onAutoFill(data.data);
      } else {
        setError('OCR processing failed. Please try again.');
      }
    } catch (err) {
      console.error('❌ Error during OCR processing:', err);
      setError('Failed to process OCR. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="ocr-uploader-container">
      <h3 className="ocr-uploader-title">Upload your document to auto-fill the form</h3>
      {error && <p className="ocr-uploader-error" style={{ color: 'red' }}>{error}</p>}
      {isProcessing && <p className="ocr-uploader-status">Processing... Please wait.</p>}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="ocr-uploader-input"
      />
      <br /><br />
      <button
        onClick={handleUpload}
        disabled={isProcessing}
        className="ocr-uploader-button"
      >
        {isProcessing ? 'Processing...' : 'Upload & Auto-fill'}
      </button>
    </div>
  );
};

export default OCRUploader;
