import React from 'react';
import '../../Styles/Notice/FindNotice.css';
// import { Link } from 'react-router-dom';

const NoticeResidentDashboard = () => {
  return (
    <div className="notice-resident-dashboard-container">
      <div className="text-center">
        <h1 className="notice-resident-dashboard-title">
          Welcome to Public Notice Management System!
        </h1>

        {/*
        <ul className="notice-resident-dashboard-button-list">
          {[
            { path: "localhost:3000/notice-resident-view", label: "View Notice List" },
          ].map((button, idx) => (
            <li key={idx} className="notice-resident-dashboard-button-item">
              <Link to={button.path} className="notice-resident-dashboard-button">
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

export default NoticeResidentDashboard;
