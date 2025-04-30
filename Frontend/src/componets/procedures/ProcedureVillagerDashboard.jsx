import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/procedures.css'

const VillagerDashboard = () => {
    return (
        <div className="dashboard-container">
            <h1>View Procedures</h1>
            <div className="dashboard-buttons">
                <Link to="/procedures" className="dashboard-btn">View Procedures</Link>
            </div>
        </div>
    );
};

export default VillagerDashboard;
