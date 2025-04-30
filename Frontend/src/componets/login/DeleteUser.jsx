import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const DeleteUser = () => {
  const [nic, setNic] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    setMessage('');
    try {
      const response = await axios.get(`http://localhost:8070/users/nic/${nic}`);
      setUserDetails(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setMessage('User not found');
      setUserDetails(null);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8070/users/nic/${nic}`);
      setMessage('User deleted successfully!');
      setUserDetails(null);
      navigate('/'); 
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('Error deleting user');
    }
  };

  const handleCancel = () => {
    navigate('/users');
  };

  const containerStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#fdf5e6', // Beige background
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '26px',
    color: '#8b4513', // Brown heading
    marginBottom: '20px',
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
    marginRight: '10px',
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

  const messageStyle = {
    color: message === 'User deleted successfully!' ? '#8b4513' : 'red', // Brown for success, red for errors
    marginTop: '20px',
  };

  const userDetailStyle = {
    textAlign: 'left',
    margin: '20px 0',
    padding: '20px',
    backgroundColor: '#fff8dc', // Light beige background
    borderRadius: '6px',
  };

  const detailLabelStyle = {
    fontWeight: 'bold',
    color: '#8b4513', // Brown for labels
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Delete User</h2>
      <input
        type="text"
        placeholder="Enter NIC"
        value={nic}
        onChange={(e) => setNic(e.target.value)}
        style={inputStyle}
      />
      <button
        onClick={fetchUserDetails}
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Fetch User
      </button>

      {userDetails && (
        <div style={userDetailStyle}>
          <p>
            <span style={detailLabelStyle}>Full Name:</span> {userDetails.fullName}
          </p>
          <p>
            <span style={detailLabelStyle}>Email:</span> {userDetails.email}
          </p>
          <p>
            <span style={detailLabelStyle}>NIC:</span> {userDetails.nic}
          </p>
          <div>
            <button
              onClick={handleDelete}
              style={buttonStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Confirm Delete
            </button>
            <button
              onClick={handleCancel}
              style={buttonStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {message && <p style={messageStyle}>{message}</p>}
    </div>
  );
};

export default DeleteUser;
