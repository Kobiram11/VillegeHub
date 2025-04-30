import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Styles/procedures.css';
import ProceduresReportButton from './ProceduresReport';  // Import the report generation component

const ProceduresList = () => {
  const [procedures, setProcedures] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProcedures = async () => {
      try {
        const response = await axios.get('http://localhost:8070/procedures/get');
        setProcedures(response.data);
        setErrorMessage('');
      } catch (error) {
        console.error('Error fetching procedures:', error);
        setErrorMessage('Failed to fetch procedures.');
      }
    };

    fetchProcedures();
  }, []);

  // Filter procedures by search query
  const filteredProcedures = procedures.filter(procedure =>
    procedure.ServiceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="procedures-list-container">
      <h2>Procedures List</h2>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Service Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      <ul className="procedures-list">
        {filteredProcedures.length > 0 ? (
          filteredProcedures.map(procedure => (
            <li key={procedure._id} className="procedure-item">
              <div>
                <strong>{procedure.ServiceName}</strong> {/* Display the Service Name */}
                <p>{procedure.ServiceDetail}</p> {/* Display the Service Details */}
              </div>
            </li>
          ))
        ) : (
          <p>No procedures found matching your search.</p>
        )}
      </ul>

      {/* Add the report generation button */}
      {filteredProcedures.length > 0 && (
        <ProceduresReportButton procedures={filteredProcedures} />
      )}
    </div>
  );
};

export default ProceduresList;
