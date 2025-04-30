import React from 'react';
import '../../Styles/Notice/FindNotice.css';
// import { Link } from 'react-router-dom';

const NoticeDashboard = () => {
  return (
    <div className="notice-dashboard-container">
    <div className="text-center">
      <h1 className="notice-dashboard-title">
        Welcome to Public Notice Management System!
      </h1>
  
      {/* 
      <ul className="notice-dashboard-button-list">
        {[...].map((button, idx) => (
          <li key={idx} className="notice-dashboard-button-item">
            <Link to={button.path} className="notice-dashboard-button">
              {button.label}
            </Link>
          </li>
        ))}
      </ul> 
      */}
    </div>
  </div>
  );
};

export default NoticeDashboard;
