import React, { useState } from 'react';
import axios from 'axios';
import '../../Styles/procedures.css';

const UpdateProcedure = () => {
  const [searchName, setSearchName] = useState(''); // For searching service
  const [serviceDetails, setServiceDetails] = useState(null); // To store fetched service details
  const [updatedServiceName, setUpdatedServiceName] = useState('');
  const [updatedServiceDetail, setUpdatedServiceDetail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle search
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/procedures/search`, {
        params: { name: searchName },
      });

      if (response.data.length > 0) {
        const procedure = response.data[0];
        setServiceDetails(procedure);  // Store the service details
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

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!serviceDetails) return;

    try {
      // Updating using the original ServiceName
      const response = await axios.put(`http://localhost:8070/procedures/${serviceDetails._id}`, {
        ServiceName: updatedServiceName,       // The updated service name
        ServiceDetail: updatedServiceDetail    // The updated service detail
      });

      if (response.status === 200) {
        setSuccessMessage('Procedure updated successfully!');
        // Reset fields
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
    <div className="update-procedure-container">
      <h2>Update Procedure</h2>
      
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by Service Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-btn">Search</button>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      {serviceDetails && (
        <form className="update-form" onSubmit={handleUpdate}>
          <div>
            <label>Service Name:</label>
            <input
              type="text"
              value={updatedServiceName}
              onChange={(e) => setUpdatedServiceName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Service Detail:</label>
            <input
              type="text"
              value={updatedServiceDetail}
              onChange={(e) => setUpdatedServiceDetail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Update</button>
        </form>
      )}

      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default UpdateProcedure;
