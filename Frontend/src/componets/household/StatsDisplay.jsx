import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Styles/housestat.css'; // Import your CSS file

const StatsDisplay = () => {
    const [stats, setStats] = useState({
        totalHouses: 0,
        totalFamilies: 0,
        totalMembers: 0
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/stats');
                setStats(response.data);
            } catch (err) {
                setError('Failed to fetch stats');
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="stats-container">
            <h2>Village Statistics</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="stats-boxes">
                <div className="stats-box">
                    <h3>Total Houses</h3>
                    <p className="pstat">{stats.totalHouses}</p>
                </div>
                <div className="stats-box">
                    <h3>Total Families</h3>
                    <p className="pstat">{stats.totalFamilies}</p>
                </div>
                <div className="stats-box">
                    <h3>Total Members</h3>
                    <p className="pstat">{stats.totalMembers}</p>
                </div>
            </div>
        </div>
    );
};

export default StatsDisplay;
