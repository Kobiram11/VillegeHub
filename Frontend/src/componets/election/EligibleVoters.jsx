import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditSubmissions'; // Ensure your styles match updated class names
import ElectionReportButton from './ElectionReport';

const GetResidents = () => {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await axios.get('http://localhost:8070/election/get');
        setResidents(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching residents');
        setLoading(false);
      }
    };

    fetchResidents();
  }, []);

  if (loading) {
    return <p className="election-getresidents-loading">Loading...</p>;
  }

  if (error) {
    return <p className="election-getresidents-error">{error}</p>;
  }

  return (
    <div className="election-getresidents-container">
      <h2 className="election-getresidents-title">Registered Residents</h2>
      {residents.length === 0 ? (
        <p className="election-getresidents-empty">No residents found.</p>
      ) : (
        <>
          <table className="election-getresidents-table">
            <thead>
              <tr>
                <th>NIC</th>
                <th>Full Name</th>
                <th>Voter Status</th>
                <th>Email</th>
                <th>Family Reference Number</th>
              </tr>
            </thead>
            <tbody>
              {residents.map((resident) => (
                <tr key={resident.NIC}>
                  <td>{resident.NIC}</td>
                  <td>{resident.FullName}</td>
                  <td>{resident.VoterStatus}</td>
                  <td>{resident.Email}</td>
                  <td>{resident.FamilyReferenceNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="election-getresidents-report-button">
            <ElectionReportButton residents={residents} />
          </div>
        </>
      )}
    </div>
  );
};

export default GetResidents;
