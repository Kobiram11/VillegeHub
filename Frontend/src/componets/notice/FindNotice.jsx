import React, { useState } from 'react';
import axios from 'axios';
import '../../Styles/Notice/FindNotice.css';

const FindNoticeGrama = () => {
  const [noticeId, setNoticeId] = useState('');
  const [notice, setNotice] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!noticeId) {
      setError('Please enter a valid notice ID');
      return;
    }

    setLoading(true);
    setError('');
    setNotice(null);

    try {
      const response = await axios.get(`http://localhost:8070/notice/${noticeId}`);
      setNotice(response.data);
      setError('');
    } catch (err) {
      setError('Notice not found');
      console.error('Error fetching notice:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="find-notice-grama-container">
      <h2 className="find-notice-grama-title">Find Notice by ID</h2>

      <div className="find-notice-grama-search">
        <input
          type="text"
          placeholder="Enter Notice ID"
          value={noticeId}
          onChange={(e) => setNoticeId(e.target.value)}
          className="find-notice-grama-input"
        />
        <button
          onClick={handleSearch}
          className="find-notice-grama-button"
        >
          Search
        </button>
      </div>

      {loading && <p className="find-notice-grama-loading">Loading...</p>}
      {error && <p className="find-notice-grama-error">{error}</p>}

      {notice && (
        <div className="find-notice-grama-details-card">
          <h3 className="find-notice-grama-details-title">Notice Details</h3>
          <p><strong>ID:</strong> {notice.id}</p>
          <p><strong>Category:</strong> {notice.noticeCategory}</p>
          <p><strong>Description:</strong> {notice.description}</p>
          <p><strong>Created At:</strong> {new Date(notice.createdAt).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default FindNoticeGrama;
