import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Styles/procedures.css';
import ProceduresReportButton from './ProceduresReport';

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

  const filteredProcedures = procedures.filter(procedure =>
    procedure.ServiceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="procedures-vill-list-container">
      <h2 className="procedures-vill-heading">Procedures List</h2>

      <div className="procedures-vill-search-bar">
        <input
          type="text"
          placeholder="Search by Service Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="procedures-vill-search-input"
        />
      </div>

      {errorMessage && <p className="procedures-vill-error-message">{errorMessage}</p>}
      
      <ul className="procedures-vill-list">
        {filteredProcedures.length > 0 ? (
          filteredProcedures.map(procedure => (
            <li key={procedure._id} className="procedures-vill-item">
              <div className="procedures-vill-content">
                <strong className="procedures-vill-name">{procedure.ServiceName}</strong>
                <p className="procedures-vill-detail">{procedure.ServiceDetail}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="procedures-vill-no-results">No procedures found matching your search.</p>
        )}
      </ul>

      {filteredProcedures.length > 0 && (
        <div className="procedures-vill-report-button">
          <ProceduresReportButton procedures={filteredProcedures} />
        </div>
      )}
    </div>
  );
};

export default ProceduresList;
