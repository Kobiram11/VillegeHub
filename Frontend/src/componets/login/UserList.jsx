import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (nic) => {
    try {
      await axios.delete(`http://localhost:8070/users/nic/${nic}`);
      setMessage(`User with NIC ${nic} deleted successfully!`);
      setUsers(users.filter((user) => user.nic !== nic));
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('Error deleting user');
    }
  };

  const handleUpdate = (nic) => {
    navigate(`/edit-user/${nic}`);
  };

  // Inline styles for the table and page
  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#fdf5e6', // Beige background
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  const headingStyle = {
    fontSize: '28px',
    color: '#8b4513', // Brown for heading
    textAlign: 'center',
    marginBottom: '20px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff8dc', // Light beige for table background
    color: '#8b4513', // Brown text
  };

  const thStyle = {
    backgroundColor: '#ffae42', // Orange header
    color: '#fff',
    padding: '10px',
  };

  const tdStyle = {
    border: '1px solid #d2b48c', // Light brown borders
    padding: '10px',
    textAlign: 'center',
  };

  const buttonStyle = {
    padding: '8px 16px',
    margin: '5px',
    fontSize: '14px',
    color: '#fff',
    backgroundColor: '#ffae42', // Orange button
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const deleteButtonStyle = {
    backgroundColor: '#d2691e', // Darker orange for delete button
  };

  const handleMouseEnter = (e, color) => {
    e.target.style.backgroundColor = color;
  };

  const handleMouseLeave = (e, color) => {
    e.target.style.backgroundColor = color;
  };

  const messageStyle = {
    color: message.includes('successfully') ? '#8b4513' : 'red', // Brown for success, red for errors
    textAlign: 'center',
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>User List</h2>
      {message && <p style={messageStyle}>{message}</p>}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Full Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>NIC</th>
            <th style={thStyle}>Phone Number</th>
            <th style={thStyle}>User Type</th>
            <th style={thStyle}>Password</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td style={tdStyle}>{user.fullName}</td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>{user.nic}</td>
              <td style={tdStyle}>{user.phoneNumber}</td>
              <td style={tdStyle}>{user.userType}</td>
              <td style={tdStyle}>{user.password}</td>
              <td style={tdStyle}>
                <button
                  onClick={() => handleUpdate(user.nic)}
                  style={buttonStyle}
                  onMouseEnter={(e) => handleMouseEnter(e, '#d2691e')} // Darken on hover
                  onMouseLeave={(e) => handleMouseLeave(e, '#ffae42')}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(user.nic)}
                  style={{ ...buttonStyle, ...deleteButtonStyle }}
                  onMouseEnter={(e) => handleMouseEnter(e, '#8b0000')} // Red for hover delete
                  onMouseLeave={(e) => handleMouseLeave(e, '#d2691e')}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
