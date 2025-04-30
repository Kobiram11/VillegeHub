import React, { useState } from 'react';
import DocumentUploader from './DocumentUploader';
import AutoFillForm from './AutoFillForm';
import '../../Styles/DocumentScanner.css'; // Importing the custom CSS for this component

const DocumentScanner = () => {
  const [formData, setFormData] = useState({ name: '', nic: '', dob: '' });

  const handleExtractedData = (data) => {
    setFormData(data);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Final Submission:', formData);
    // TODO: Send to backend or hold for integration
  };

  return (
    <div className="document-scanner">
      <h1>Document Scanner</h1>
      
      <div className="section">
        <h2>Upload Document</h2>
        <DocumentUploader onDataExtracted={handleExtractedData} />
      </div>

      <div className="section">
        <h2>Auto-Filled Form</h2>
        <AutoFillForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default DocumentScanner;
