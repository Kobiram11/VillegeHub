import React, { useState } from 'react';
import axios from 'axios';
import './election.css'; // Update your CSS file to reflect new class names

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
        Birthdate: new Date(response.data.Birthdate).toISOString().split('T')[0],
      });
      setError('');
      setIsLoading(false);
    } catch (err) {
      setError('Person not found');
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.put(`http://localhost:8070/election/update`, {
        NIC: nic,
        ...formData,
      });
      setSuccess('Update successful!');
    } catch (err) {
      setError('Failed to update. Please try again.');
    }
  };

  return (
    <div className="election-update-form-container">
      <h2 className="election-update-title">Update Election Record</h2>
      {error && <p className="election-update-error">{error}</p>}
      {success && <p className="election-update-success">{success}</p>}
      <div className="election-update-nic-lookup">
        <label className="election-update-label">Enter NIC:</label>
        <input
          type="text"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
          placeholder="Enter NIC"
          className="election-update-input"
        />
        <button
          onClick={handleFetch}
          disabled={isLoading}
          className="election-update-fetch-btn"
        >
          {isLoading ? 'Loading...' : 'Fetch Details'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="election-update-form">
        <div className="election-update-form-group">
          <label className="election-update-label">Full Name</label>
          <input
            type="text"
            name="FullName"
            value={formData.FullName}
            onChange={handleChange}
            required
            className="election-update-input"
          />
        </div>
        <div className="election-update-form-group">
          <label className="election-update-label">Voter Status</label>
          <input
            type="text"
            name="VoterStatus"
            value={formData.VoterStatus}
            onChange={handleChange}
            required
            className="election-update-input"
          />
        </div>
        <div className="election-update-form-group">
          <label className="election-update-label">Email</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
            className="election-update-input"
          />
        </div>
        <div className="election-update-form-group">
          <label className="election-update-label">Family Reference Number</label>
          <input
            type="text"
            name="FamilyReferenceNumber"
            value={formData.FamilyReferenceNumber}
            onChange={handleChange}
            required
            className="election-update-input"
          />
        </div>
        <div className="election-update-form-group">
          <label className="election-update-label">Birthdate</label>
          <input
            type="date"
            name="Birthdate"
            value={formData.Birthdate}
            onChange={handleChange}
            required
            className="election-update-input"
          />
        </div>
        <button type="submit" className="election-update-submit-btn">
          Update Record
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
