import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Styles/Notice/FindNotice.css';

const ListNoticeGrama = () => {
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [editNoticeId, setEditNoticeId] = useState(null);
  const [editData, setEditData] = useState({
    id: '',
    noticeCategory: '',
    description: '',
  });
  const [selectedCategory, setSelectedCategory] = useState('');
  const noticeCategories = [
    'Public Events',
    'Public Services',
    'Welfare',
    'Election Information',
    'Social Services',
    'Other'
  ];

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('http://localhost:8070/notice');
        setNotices(response.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []);

  const handleEditClick = (notice) => {
    setEditNoticeId(notice._id);
    setEditData({
      id: notice.id,
      noticeCategory: notice.noticeCategory,
      description: notice.description,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8070/notice/update/${editNoticeId}`, editData);
      alert('Notice updated successfully');
      setEditNoticeId(null);
      window.location.reload();
    } catch (error) {
      console.error('Error updating notice:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/notice/delete/${id}`);
      alert('Notice deleted successfully');
      setNotices(notices.filter((notice) => notice._id !== id));
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8070/notice/category/${selectedCategory}`);
      setFilteredNotices(response.data);
    } catch (error) {
      console.error('Error fetching filtered notices:', error);
    }
  };

  const handleDownloadPDF = async () => {
    if (!selectedCategory) {
      alert('Please select a category first.');
      return;
    }

    try {
      const response = await axios({
        url: `http://localhost:8070/notice/report/${selectedCategory}`,
        method: 'GET',
        responseType: 'blob',
      });

      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);

      const link = document.createElement('a');
      link.href = fileURL;
      link.setAttribute('download', `notices_${selectedCategory}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div className="list-notice-grama-container">
      <h2>Notice List</h2>

      <table className="list-notice-grama-table">
        <thead>
          <tr>
            <th>Custom ID</th>
            <th>Notice Category</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice._id}>
              <td>{notice.id}</td>
              <td>{notice.noticeCategory}</td>
              <td>{notice.description}</td>
              <td>{new Date(notice.createdAt).toLocaleDateString()}</td>
              <td>
                <div className="list-notice-grama-action-buttons">
                  <button className="list-notice-grama-edit-btn" onClick={() => handleEditClick(notice)}>Edit</button>
                  <button className="list-notice-grama-delete-btn" onClick={() => handleDelete(notice._id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editNoticeId && (
        <form onSubmit={handleUpdate} className="list-notice-grama-edit-form">
          <input type="text" name="id" value={editData.id} onChange={handleInputChange} placeholder="Custom ID" required />
          <input type="text" name="noticeCategory" value={editData.noticeCategory} onChange={handleInputChange} placeholder="Notice Category" required />
          <textarea name="description" value={editData.description} onChange={handleInputChange} placeholder="Description" required />
          <button type="submit" className="list-notice-grama-edit-btn">Update Notice</button>
        </form>
      )}

      <form onSubmit={handleFilterSubmit} className="list-notice-grama-filter-form">
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
          <option value="">Select Notice Category</option>
          {noticeCategories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        <button type="submit" className="list-notice-grama-edit-btn">Filter Notices</button>
      </form>

      {filteredNotices.length > 0 && (
        <div>
          <h3>Filtered Notices</h3>
          <table className="list-notice-grama-table">
            <thead>
              <tr>
                <th>Custom ID</th>
                <th>Notice Category</th>
                <th>Description</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotices.map((notice) => (
                <tr key={notice._id}>
                  <td>{notice.id}</td>
                  <td>{notice.noticeCategory}</td>
                  <td>{notice.description}</td>
                  <td>{new Date(notice.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleDownloadPDF} className="list-notice-grama-download-btn">Download the PDF</button>
        </div>
      )}
    </div>
  );
};

export default ListNoticeGrama;
