import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Styles/procedures.css'; // Enhanced CSS for animations and styles

const DeleteProcedure = () => {
  const [procedures, setProcedures] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/procedures/${id}`);
      document.getElementById(id).classList.add('procedures-delete-grama-fade-out');
      setTimeout(() => {
        setProcedures(procedures.filter(procedure => procedure._id !== id));
        setErrorMessage('');
      }, 500);
    } catch (error) {
      console.error('Error deleting procedure:', error);
      setErrorMessage('Failed to delete procedure.');
    }
  };

  return (
    <div className="procedures-delete-grama-container">
      <h2 className="procedures-delete-grama-title">Delete Procedures</h2>
      {errorMessage && <p className="procedures-delete-grama-error">{errorMessage}</p>}
      <ul className="procedures-delete-grama-list">
        {procedures.map(procedure => (
          <li key={procedure._id} id={procedure._id} className="procedures-delete-grama-item">
            <div className="procedures-delete-grama-details">
              <strong>{procedure.ServiceName}</strong>
              <p>{procedure.ServiceDetail}</p>
            </div>
            <button
              onClick={() => handleDelete(procedure._id)}
              className="procedures-delete-grama-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteProcedure;
