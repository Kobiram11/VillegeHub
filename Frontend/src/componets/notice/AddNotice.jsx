import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Styles/Notice/AddNotice.css'; // External CSS file

const AddNoticeGrama = () => {
  const [noticeData, setNoticeData] = useState({
    id: '',
    noticeCategory: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoticeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`http://localhost:8070/notice/add`, noticeData);
      alert('Notice added successfully!');
      navigate('/notices');
    } catch (error) {
      console.error('Error adding notice:', error.response ? error.response.data : error.message);
      alert('Failed to add notice');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setNoticeData({
      id: '',
      noticeCategory: '',
      description: '',
    });
  };

  return (
    <div className="add-notice-grama-container">
      <h2 className="add-notice-grama-heading">Add New Notice</h2>
      <form onSubmit={handleSubmit} className="add-notice-grama-form">
        <input
          type="text"
          name="id"
          placeholder="ID (NTxxxx)"
          value={noticeData.id}
          onChange={handleChange}
          required
          className="add-notice-grama-form-input"
        />
        <select
          name="noticeCategory"
          value={noticeData.noticeCategory}
          onChange={handleChange}
          required
          className="add-notice-grama-form-input"
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
        <textarea
          name="description"
          placeholder="Description (Minimum 10 characters)"
          value={noticeData.description}
          onChange={handleChange}
          required
          className="add-notice-grama-form-textarea"
        />
        <button
          type="submit"
          disabled={loading}
          className="add-notice-grama-btn add-notice-grama-submit-btn"
        >
          {loading ? 'Adding...' : 'Add Notice'}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="add-notice-grama-btn add-notice-grama-cancel-btn"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddNoticeGrama;
