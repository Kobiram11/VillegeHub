import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Styles/Notice/DeleteNotice.css'; // External CSS file

const DeleteNotice = () => {
  const [noticeId, setNoticeId] = useState('');
  const [notice, setNotice] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!noticeId) {
      setError('Please enter a valid Notice ID');
      return;
    }

    setLoading(true);
    setError('');
    setNotice(null);

    try {
      const response = await axios.get(`http://localhost:8070/notice/${noticeId}`);
      const fetchedNotice = response.data;

      if (fetchedNotice) {
        setNotice(fetchedNotice);
        setError('');
      } else {
        setError('Notice not found');
      }
    } catch (error) {
      setError(
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Error fetching notice'
      );
      setNotice(null);
      console.error('Error fetching notice:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete the notice with ID: ${notice.id}?`)) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8070/notice/delete/${noticeId}`);
      alert('Notice deleted successfully!');
      navigate('/notices');
    } catch (error) {
      console.error('Error deleting notice:', error);
      alert('Failed to delete notice');
    }
  };

  const handleCancel = () => {
    setNoticeId('');
    setNotice(null);
  };

  return (
    <div className="delete-notice-container">
      <h2 className="delete-heading">Delete Notice</h2>

      <div>
        <input
          type="text"
          placeholder="Enter Notice ID"
          value={noticeId}
          onChange={(e) => setNoticeId(e.target.value)}
          className="delete-input"
        />
        <button
          onClick={handleSearch}
          className="delete-button"
        >
          Search Notice
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {notice && (
        <div className="notice-details">
          <h3>Notice Details</h3>
          <p><strong>Custom ID:</strong> {notice.id}</p>
          <p><strong>Notice Category:</strong> {notice.noticeCategory}</p>
          <p><strong>Description:</strong> {notice.description}</p>
          <p><strong>Created At:</strong> {new Date(notice.createdAt).toLocaleDateString()}</p>

          <div className="notice-buttons">
            <button onClick={handleDelete} className="delete-button">Delete Notice</button>
            <button onClick={handleCancel} className="delete-button">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteNotice;