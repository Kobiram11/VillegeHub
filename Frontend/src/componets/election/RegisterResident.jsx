import React, { useState } from 'react';
import axios from 'axios';
import './election.css'; // Create CSS styles separately

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    FullName: '',
    NIC: '',
    VoterStatus: '', // Auto-updated based on birthdate
    Email: '',
    FamilyReferenceNumber: '',
    Birthdate: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Automatically update VoterStatus based on Birthdate
    if (name === 'Birthdate') {
      const voterStatus = validateAge(value) ? 'Eligible' : 'Not Eligible';
      setFormData({
        ...formData,
        Birthdate: value,
        VoterStatus: voterStatus,
      });
    }
  };

  // NIC validation function
  const validateNIC = (nic) => {
    // You can add more robust validation here if needed
    return nic.length === 10;
  };

  // Age validation function
  const validateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    
    // Check for month or day differences
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      return age - 1 >= 18;
    }
    return age >= 18;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate NIC
    if (!validateNIC(formData.NIC)) {
      setError('NIC must be exactly 10 characters.');
      setSuccess('');
      return;
    }

    // Validate Voter Status (cannot be 'Not Eligible')
    if (formData.VoterStatus === 'Not Eligible') {
      setError('You cannot register if you are Not Eligible to vote.');
      setSuccess('');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8070/election/add', formData);
      setSuccess('Registration successful!');
      setError('');
      setFormData({
        FullName: '',
        NIC: '',
        VoterStatus: '', // Reset status
        Email: '',
        FamilyReferenceNumber: '',
        Birthdate: '',
      });
    } catch (err) {
      setError('Failed to register. Please check your inputs and try again.');
      setSuccess('');
    }
  };

  return (
    <div className="registration-form-container">
      <h2>Election Registration Form</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
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
          <label>NIC</label>
          <input
            type="text"
            name="NIC"
            value={formData.NIC}
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
        <div className="form-group">
          <label>Voter Status</label>
          <input
            type="text"
            name="VoterStatus"
            value={formData.VoterStatus}
            readOnly
          />
        </div>
        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
