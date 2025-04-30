import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Styles/Notice/EditNotice.css'; // External CSS file

const EditNotice = () => {
  const [noticeId, setNoticeId] = useState('');
  const [notice, setNotice] = useState(null);
  const [noticeCategory, setNoticeCategory] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchNoticeById = async (id) => {
    if (!id) {
      setError('Please enter a valid Notice ID');
      return;
    }

    setLoading(true);
    setError('');
    setNotice(null);

    try {
      const response = await axios.get(`http://localhost:8070/notice/${id}`);
      const fetchedNotice = response.data;

      if (fetchedNotice) {
        setNotice(fetchedNotice);
        setNoticeCategory(fetchedNotice.noticeCategory);
        setDescription(fetchedNotice.description);
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

  const handleSearch = () => {
    fetchNoticeById(noticeId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8070/notice/update/${noticeId}`, {
        noticeCategory,
        description,
      });
      alert('Notice updated successfully!');
      navigate('/notices');
    } catch (error) {
      console.error('Error updating notice:', error);
      alert('Failed to update notice');
    }
  };

  const handleCancel = () => {
    setNoticeId('');
    setNotice(null);
    setNoticeCategory('');
    setDescription('');
  };

  return (
    <div className="edit-notice-container">
      <h2 className="edit-heading">Edit Notice</h2>

      <div className="search-section">
        <input
          type="text"
          placeholder="Enter Notice ID"
          value={noticeId}
          onChange={(e) => setNoticeId(e.target.value)}
          className="edit-input"
        />
        <button onClick={handleSearch} className="edit-button">Search Notice</button>
      </div>

      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {notice && (
        <form onSubmit={handleSubmit} className="edit-form">
          <label className="edit-label">Notice Category:</label>
          <select
            value={noticeCategory}
            onChange={(e) => setNoticeCategory(e.target.value)}
            required
            className="edit-select"
          >
            <option value="" disabled hidden>
              Select the Notice Category
            </option>
            <option value="Public Events">Public Events</option>
            <option value="Public Services">Public Services</option>
            <option value="Welfare">Welfare</option>
            <option value="Election Information">Election Information</option>
            <option value="Social Services">Social Services</option>
            <option value="Other">Other</option>
          </select>

          <label className="edit-label">Description:</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="edit-textarea"
          />

          <div className="edit-button-group">
            <button type="submit" className="edit-button">Update Notice</button>
            <button type="button" onClick={handleCancel} className="edit-button">Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditNotice;