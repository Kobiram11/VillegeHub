import React, { useState } from 'react';
import axios from 'axios';
import './election.css'; // Make sure to match styles accordingly

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    FullName: '',
    NIC: '',
    VoterStatus: '',
    Email: '',
    FamilyReferenceNumber: '',
    Birthdate: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    // Automatically update VoterStatus based on Birthdate
    if (name === 'Birthdate') {
      const voterStatus = validateAge(value) ? 'Eligible' : 'Not Eligible';
      updatedData.VoterStatus = voterStatus;
    }

    setFormData(updatedData);
  };

  const validateNIC = (nic) => {
    return nic.length === 10;
  };

  const validateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    const d = today.getDate() - birthDate.getDate();

    if (m < 0 || (m === 0 && d < 0)) {
      age--;
    }

    return age >= 18;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateNIC(formData.NIC)) {
      setError('NIC must be exactly 10 characters.');
      setSuccess('');
      return;
    }

    if (formData.VoterStatus === 'Not Eligible') {
      setError('You cannot register if you are Not Eligible to vote.');
      setSuccess('');
      return;
    }

    try {
      await axios.post('http://localhost:8070/election/add', formData);
      setSuccess('Registration successful!');
      setError('');
      setFormData({
        FullName: '',
        NIC: '',
        VoterStatus: '',
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
    <div className="election-register-form-container">
      <h2 className="election-register-title">Election Registration Form</h2>
      {error && <p className="election-register-error">{error}</p>}
      {success && <p className="election-register-success">{success}</p>}

      <form onSubmit={handleSubmit} className="election-register-form">
        <div className="election-register-form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="FullName"
            value={formData.FullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="election-register-form-group">
          <label>NIC</label>
          <input
            type="text"
            name="NIC"
            value={formData.NIC}
            onChange={handleChange}
            required
          />
        </div>

        <div className="election-register-form-group">
          <label>Email</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="election-register-form-group">
          <label>Family Reference Number</label>
          <input
            type="text"
            name="FamilyReferenceNumber"
            value={formData.FamilyReferenceNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="election-register-form-group">
          <label>Birthdate</label>
          <input
            type="date"
            name="Birthdate"
            value={formData.Birthdate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="election-register-form-group">
          <label>Voter Status</label>
          <input
            type="text"
            name="VoterStatus"
            value={formData.VoterStatus}
            readOnly
          />
        </div>

        <button type="submit" className="election-register-submit-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
