import React, { useState, useContext } from 'react';
import axios from 'axios';
import './election.css'; // Make sure to match styles accordingly
import { AuthContext } from '../../App';
import './election.css';
import OCRUploader from '../AI OCR/OCRUploader'; // Adjust path as needed

const RegistrationForm = () => {
  const { isAuthenticated } = useContext(AuthContext);

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
  const [submitting, setSubmitting] = useState(false);

  // ✅ Update form state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    if (name === 'Birthdate') {
      const voterStatus = validateAge(value) ? 'Eligible' : 'Not Eligible';
      updatedData.VoterStatus = voterStatus;
    }

    setFormData(updatedData);
  };

  // ✅ Auto-fill from OCR
  const handleAutoFill = (data) => {
    const { name, nic, dob, email, family_ref } = data;

    const updated = {
      ...formData,
      FullName: name || '',
      NIC: nic || '',
      Birthdate: dob || '',
      Email: email || '',
      FamilyReferenceNumber: family_ref || '',
    };

    if (dob) {
      updated.VoterStatus = validateAge(dob) ? 'Eligible' : 'Not Eligible';
    }

    setFormData(updated);
  };

  // ✅ Validate 10 or 12 character NICs
  const validateNIC = (nic) => nic.length === 10 || nic.length === 12;

  // ✅ Check if user is 18+
  const validateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    const d = today.getDate() - birthDate.getDate();
    if (m < 0 || (m === 0 && d < 0)) age--;
    return age >= 18;
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError('Please login to register for elections.');
      setSuccess('');
      return;
    }
    setError('');
    setSuccess('');

    if (!validateNIC(formData.NIC)) {
      setError('NIC must be exactly 10 or 12 characters.');
      return;
    }

    if (formData.VoterStatus === 'Not Eligible') {
      setError('You are not eligible to vote.');
      return;
    }

    try {
      setSubmitting(true);
      await axios.post('http://localhost:8070/election/add', formData);
      setSuccess('✅ Registration successful!');
      setFormData({
        FullName: '',
        NIC: '',
        VoterStatus: '',
        Email: '',
        FamilyReferenceNumber: '',
        Birthdate: '',
      });
    } catch (err) {
      setError('❌ Failed to register.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="election-register-form-container">
      <h2 className="election-register-title">Election Registration Form</h2>
      {error && <p className="election-register-error">{error}</p>}
      {success && <p className="election-register-success">{success}</p>}

      {/* 📤 OCR File Upload */}
      <OCRUploader onAutoFill={handleAutoFill} />

      <form onSubmit={handleSubmit} className="election-register-form">
        <div className="election-register-form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="FullName"
            value={formData.FullName}
            onChange={handleChange}
            required
            disabled={!isAuthenticated}
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
            disabled={!isAuthenticated}
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
            disabled={!isAuthenticated}
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
            disabled={!isAuthenticated}
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
            disabled={!isAuthenticated}
          />
        </div>

        <div className="election-register-form-group">
          <label>Voter Status</label>
          <input type="text" name="VoterStatus" value={formData.VoterStatus} readOnly />
        </div>

        <button type="submit" className="election-register-submit-btn" disabled={!isAuthenticated}>
          Register
        <button
          type="submit"
          className="election-register-submit-btn"
          disabled={submitting}
        >
          {submitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
