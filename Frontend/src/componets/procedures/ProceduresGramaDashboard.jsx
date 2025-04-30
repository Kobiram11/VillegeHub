import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/procedures.css'

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <h1>Procedure Management </h1>
            <div className="dashboard-buttons">
                
            <Link to="/create" className="dashboard-btn">Create Procedure</Link>
        
                
                <Link to="/update" className="dashboard-btn">Update Procedure</Link>
                <Link to="/delete" className="dashboard-btn">Delete Procedure</Link>
            </div>
        </div>
    );
};

export default Dashboard;
