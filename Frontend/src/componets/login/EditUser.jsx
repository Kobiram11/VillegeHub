import React, { useState } from 'react';
import axios from 'axios';

const EditUser = () => {
  const [nic, setNic] = useState(''); // Changed from userId to nic
  const [formData, setFormData] = useState({
    fullName: '',
    userType: '',
    email: '',
    phoneNumber: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  // Fetch user details by NIC
  const handleFetchUser = async () => {
    if (!nic) {
      setMessage("Please enter an NIC.");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8070/users/nic/${nic}`); // Use NIC instead of userId
      if (response.data) {
        setFormData({
          fullName: response.data.fullName,
          userType: response.data.userType,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          password: response.data.password
        });
        setMessage('');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setMessage('User not found or error fetching user details');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8070/users/nic/${nic}`, formData); // Updated to use NIC
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('Error updating user');
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    // Optionally fetch the user again to reset form data or just clear the form
    handleFetchUser();
  };

  return (
    <div>
      <h2>Edit User</h2>
      <input
        type="text"
        placeholder="Enter NIC"
        value={nic} // Using nic instead of userId
        onChange={(e) => setNic(e.target.value)} // Update NIC state
      />
      <button onClick={handleFetchUser}>Fetch User</button>
      <form onSubmit={handleUpdate}>
        <br />
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          placeholder="Full Name"
          onChange={handleChange}
        />
        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select User Type
          </option>
          <option value="Admin">Admin</option>
          <option value="Grama Niladhari">Grama Niladhari</option>
          <option value="Resident">Resident</option>
          <option value="Divisional Secrateriat">Divisional Secrateriat</option>
        </select>
        <input
          type="text"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          placeholder="Phone Number"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="New Password (Optional)"
          onChange={handleChange}
        />
        <button type="submit">Update User</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditUser;
