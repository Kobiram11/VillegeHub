// src/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './election.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Welcome to the Election Management System</h2>
      <div className="nav-buttons">
        {/* Removed the "View Elections" button */}
        {/* Removed the "View Submissions" button */}
        <Link to="/register">
          <button className="dashboard-button">Register Resident</button>
        </Link>
        <Link to="/voters">
          <button className="dashboard-button">View Eligible Voters</button>
        </Link>
        {/* Added the "Update Submissions" button */}
        <Link to="/edit">
          <button className="dashboard-button">Update Submissions</button>
        </Link>
        {/* Added the "Delete Submissions" button */}
        <Link to="/delete">
          <button className="dashboard-button">Delete Submissions</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
