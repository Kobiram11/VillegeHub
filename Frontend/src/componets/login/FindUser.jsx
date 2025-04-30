import React, { useState } from 'react';
import axios from 'axios';

const FindUser = () => {
  const [nic, setNic] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/users/nic/${nic}`);
      setUser(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching user:', err);
      setError('User not found');
      setUser(null);
    }
  };

  const containerStyle = {
    maxWidth: '450px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#fdf5e6', // Beige background
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  };

  const headingStyle = {
    fontSize: '24px',
    color: '#8b4513', // Brown color for heading
    marginBottom: '10px',
    borderBottom: '2px solid #ffae42', // Orange underline
    paddingBottom: '10px',
  };

  const paragraphStyle = {
    fontSize: '16px',
    color: '#666',
    marginBottom: '8px',
  };

  const strongStyle = {
    color: '#8b4513', // Brown color for labels
    marginRight: '5px',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #d2b48c', // Light brown border
    borderRadius: '6px',
    fontSize: '16px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#ffae42', // Orange button
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#d2691e', // Darker orange on hover
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = buttonStyle.backgroundColor;
  };

  return (
    <div style={containerStyle}>
      <h2>Find User by NIC</h2>
      <input
        type="text"
        placeholder="Enter NIC"
        value={nic}
        onChange={(e) => setNic(e.target.value)}
        style={inputStyle}
      />
      <button
        onClick={handleSearch}
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Search
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {user && (
        <div style={containerStyle}>
          <h3 style={headingStyle}>{user.fullName}</h3>
          <p style={paragraphStyle}>
            <strong style={strongStyle}>Email:</strong> {user.email}
          </p>
          <p style={paragraphStyle}>
            <strong style={strongStyle}>NIC:</strong> {user.nic}
          </p>
          <p style={paragraphStyle}>
            <strong style={strongStyle}>Phone Number:</strong> {user.phoneNumber}
          </p>
          <p style={paragraphStyle}>
            <strong style={strongStyle}>User Type:</strong> {user.userType}
          </p>
        </div>
      )}
    </div>
  );
};

export default FindUser;
