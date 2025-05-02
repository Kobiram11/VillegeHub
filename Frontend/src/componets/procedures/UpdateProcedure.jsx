import React, { useState } from 'react';
import axios from 'axios';
import '../../Styles/procedures.css';

const UpdateProcedure = () => {
  const [searchName, setSearchName] = useState('');
  const [serviceDetails, setServiceDetails] = useState(null);
  const [updatedServiceName, setUpdatedServiceName] = useState('');
  const [updatedServiceDetail, setUpdatedServiceDetail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/procedures/search`, {
        params: { name: searchName },
      });

      if (response.data.length > 0) {
        const procedure = response.data[0];
        setServiceDetails(procedure);
        setUpdatedServiceName(procedure.ServiceName);
        setUpdatedServiceDetail(procedure.ServiceDetail);
        setErrorMessage('');
      } else {
        setErrorMessage('Service not found');
        setServiceDetails(null);
      }
    } catch (error) {
      setErrorMessage('Error fetching procedure');
      console.error(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!serviceDetails) return;

    try {
      const response = await axios.put(`http://localhost:8070/procedures/${serviceDetails._id}`, {
        ServiceName: updatedServiceName,
        ServiceDetail: updatedServiceDetail
      });

      if (response.status === 200) {
        setSuccessMessage('Procedure updated successfully!');
        setSearchName('');
        setServiceDetails(null);
        setUpdatedServiceName('');
        setUpdatedServiceDetail('');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        setErrorMessage('Failed to update procedure');
      }
    } catch (error) {
      setErrorMessage('Error updating procedure');
      console.error(error);
    }
  };

  return (
    <div className="update-procedure-grama-container">
      <h2 className="update-procedure-grama-title">Update Procedure</h2>
      
      <div className="update-procedure-grama-search-section">
        <input
          type="text"
          placeholder="Search by Service Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="update-procedure-grama-search-input"
        />
        <button onClick={handleSearch} className="update-procedure-grama-search-btn">Search</button>
      </div>

      {errorMessage && <p className="update-procedure-grama-error">{errorMessage}</p>}
      
      {serviceDetails && (
        <form className="update-procedure-grama-form" onSubmit={handleUpdate}>
          <div className="update-procedure-grama-input-group">
            <label>Service Name:</label>
            <input
              type="text"
              value={updatedServiceName}
              onChange={(e) => setUpdatedServiceName(e.target.value)}
              required
              className="update-procedure-grama-input"
            />
          </div>
          <div className="update-procedure-grama-input-group">
            <label>Service Detail:</label>
            <input
              type="text"
              value={updatedServiceDetail}
              onChange={(e) => setUpdatedServiceDetail(e.target.value)}
              required
              className="update-procedure-grama-input"
            />
          </div>
          <button type="submit" className="update-procedure-grama-submit-btn">Update</button>
        </form>
      )}

      {successMessage && <p className="update-procedure-grama-success">{successMessage}</p>}
    </div>
  );
};

export default UpdateProcedure;
