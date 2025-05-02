import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Styles/Notice/FindNotice.css';

const NoticeResidentViewVill = () => {
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
    <div className="list-notice-vill-container">
      <h2 className="list-notice-vill-heading">Notice Board</h2>
      <div className="list-notice-vill-list">
        {notices.map((notice) => (
          <div key={notice._id} className="list-notice-vill-card">
            <h5 className="list-notice-vill-text">
              <strong>Category:</strong> {notice.noticeCategory}
            </h5>
            <p className="list-notice-vill-text">
              <strong>Description:</strong> {notice.description}
            </p>
            <p className="list-notice-vill-text">
              <strong>Posted On:</strong> {new Date(notice.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeResidentViewVill;
