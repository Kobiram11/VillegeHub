// src/components/ViewSubmissions.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './election.css';

const ViewSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get('http://localhost:8070/election/get');
      console.log('Submissions fetched:', response.data);
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div className="view-submissions">
      <h2>Submissions</h2>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>NIC</th>
            <th>Voter Status</th>
            <th>Email</th>
            <th>Family Reference Number</th>
            <th>Birthdate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.length === 0 ? (
            <tr>
              <td colSpan="7">No submissions available.</td>
            </tr>
          ) : (
            submissions.map((submission) => (
              <tr key={submission._id}>
                <td>{submission.FullName}</td>
                <td>{submission.NIC}</td>
                <td>{submission.VoterStatus}</td>
                <td>{submission.Email}</td>
                <td>{submission.FamilyReferenceNumber}</td>
                <td>{new Date(submission.Birthdate).toLocaleDateString()}</td>
                <td>{/* Add action buttons here */}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSubmissions;
