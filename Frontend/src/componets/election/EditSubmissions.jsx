import React, { useState } from 'react';
import axios from 'axios';
import './election.css'; // Create CSS styles separately

const UpdateForm = () => {
  const [nic, setNic] = useState('');
  const [formData, setFormData] = useState({
    FullName: '',
    VoterStatus: '',
    Email: '',
    FamilyReferenceNumber: '',
    Birthdate: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch details by NIC
  const handleFetch = async () => {
    if (!nic) {
      setError('Please enter a NIC');
      return;
    }
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.get(`http://localhost:8070/election/nic/${nic}`);
      setFormData({
        FullName: response.data.FullName,
        VoterStatus: response.data.VoterStatus,
        Email: response.data.Email,
        FamilyReferenceNumber: response.data.FamilyReferenceNumber,
        Birthdate: new Date(response.data.Birthdate).toISOString().split('T')[0], // Format date as YYYY-MM-DD
      });
      setError('');
      setIsLoading(false);
    } catch (err) {
      setError('Person not found');
      setIsLoading(false);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission (update details)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.put(`http://localhost:8070/election/update`, {
        NIC: nic, // NIC will be used to find the record to update
        ...formData,
      });
      setSuccess('Update successful!');
    } catch (err) {
      setError('Failed to update. Please try again.');
    }
  };

  return (
    <div className="update-form-container">
      <h2>Update Election Record</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <div className="nic-lookup">
        <label>Enter NIC:</label>
        <input
          type="text"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
          placeholder="Enter NIC"
        />
        <button onClick={handleFetch} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Fetch Details'}
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="FullName"
            value={formData.FullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Voter Status</label>
          <input
            type="text"
            name="VoterStatus"
            value={formData.VoterStatus}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Family Reference Number</label>
          <input
            type="text"
            name="FamilyReferenceNumber"
            value={formData.FamilyReferenceNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Birthdate</label>
          <input
            type="date"
            name="Birthdate"
            value={formData.Birthdate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Update Record</button>
      </form>
    </div>
  );
};

export default UpdateForm;
