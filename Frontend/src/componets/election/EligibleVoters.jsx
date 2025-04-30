import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditSubmissions';
import ElectionReportButton from './ElectionReport';  // Import the report generation component

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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="get-residents">
      <h2>Registered Residents</h2>
      {residents.length === 0 ? (
        <p>No residents found.</p>
      ) : (
        <>
          <table>
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
          {/* Add the report generation button */}
          <ElectionReportButton residents={residents} />
        </>
      )}
    </div>
  );
};

export default GetResidents;
