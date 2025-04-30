import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    userType: '',
    nic: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { fullName, userType, nic, email, phoneNumber, password, confirmPassword } = formData;
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!fullName || !userType || !nic || !email || !phoneNumber || !password || !confirmPassword) {
      alert('All fields are required.');
      return false;
    }
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop if validation fails
    }

    try {
      const response = await axios.post(`http://localhost:8070/users/register`, formData);
      alert(response.data.message);
    } catch (error) {
      console.error('Error creating user:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Error creating user');
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: '',
      userType: '',
      nic: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: ''
    });
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: 'beige',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  };

  const headingStyle = {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '16px'
  };

  const selectStyle = {
    ...inputStyle,
    backgroundColor: '#fff',
    cursor: 'pointer'
  };

  const buttonGroupStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px'
  };

  const buttonStyle = {
    padding: '5px 10px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: 'orange',
    border: 'none',
    borderRadius: '100px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, box-shadow 0.3s'
  };

  const handleHover = (e) => {
    e.target.style.backgroundColor = '#0056b3';
    e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  };

  const handleHoverOut = (e) => {
    e.target.style.backgroundColor = '#007BFF';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>User Registration Form</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          required
          style={selectStyle}
        >
          <option value="" disabled>
            Select User Type
          </option>
          <option value="Grama Niladhari">Grama Niladhari</option>
          <option value="Resident">Resident</option>
          <option value="Divisional Secrateriat">Divisional Secrateriat</option>
        </select>

        <input
          type="text"
          name="nic"
          placeholder="NIC"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <div style={buttonGroupStyle}>
          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverOut}
          >
            Add User
          </button>
          <button
            type="button"
            onClick={handleCancel}
            style={buttonStyle}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverOut}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
