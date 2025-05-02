import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Styles/Notice/DeleteNotice.css';

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
        error.response?.data?.message || 'Error fetching notice'
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
    <div className="notice-delete-grama-container">
      <h2 className="notice-delete-grama-heading">Delete Notice</h2>

      <div className="notice-delete-grama-input-section">
        <input
          type="text"
          placeholder="Enter Notice ID"
          value={noticeId}
          onChange={(e) => setNoticeId(e.target.value)}
          className="notice-delete-grama-input"
        />
        <button onClick={handleSearch} className="notice-delete-grama-button">
          Search Notice
        </button>
      </div>

      {loading && <p className="notice-delete-grama-loading">Loading...</p>}
      {error && <p className="notice-delete-grama-error">{error}</p>}

      {notice && (
        <div className="notice-delete-grama-details">
          <h3>Notice Details</h3>
          <p><strong>Custom ID:</strong> {notice.id}</p>
          <p><strong>Notice Category:</strong> {notice.noticeCategory}</p>
          <p><strong>Description:</strong> {notice.description}</p>
          <p><strong>Created At:</strong> {new Date(notice.createdAt).toLocaleDateString()}</p>

          <div className="notice-delete-grama-buttons">
            <button onClick={handleDelete} className="notice-delete-grama-button">Delete Notice</button>
            <button onClick={handleCancel} className="notice-delete-grama-button">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteNotice;
