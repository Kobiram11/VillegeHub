import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Styles/Notice/FindNotice.css';

const NoticeResidentView = () => {
  const [notices, setNotices] = useState([]);

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

  return (
    <div className="notice-resident-view-container">
      <h2 className="notice-resident-heading">Notice Board</h2>
      <div className="notice-resident-list">
        {notices.map((notice) => (
          <div key={notice._id} className="notice-resident-card">
            <h5 className="notice-resident-text">
              <strong>Category:</strong> {notice.noticeCategory}
            </h5>
            <p className="notice-resident-text">
              <strong>Description:</strong> {notice.description}
            </p>
            <p className="notice-resident-text">
              <strong>Posted On:</strong> {new Date(notice.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeResidentView;