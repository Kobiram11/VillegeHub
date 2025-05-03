import React, { useEffect, useState } from 'react';
import './election.css'; // Make sure path is correct

const DeleteSubmissions = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  const fetchElections = async () => {
    try {
      const response = await fetch('http://localhost:8070/election/get');
      const data = await response.json();
      setElections(data);
    } catch (error) {
      console.error('Error fetching elections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this submission?');
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:8070/election/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setElections((prev) => prev.filter((item) => item._id !== id));
        setToastMessage('Deleted successfully!');
        setTimeout(() => setToastMessage(''), 3000);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting election submission:', error);
      alert('Failed to delete election submission.');
    }
  };

  useEffect(() => {
    fetchElections();
  }, []);

  return (
    <div className="delete-submissions-electioncontainer">
      <h2>Delete Election Submissions</h2>

      {loading ? (
        <div className="loader">Loading...</div>
      ) : elections.length === 0 ? (
        <p>No submissions available.</p>
      ) : (
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
            {elections.map((election) => (
              <tr key={election._id}>
                <td>{election.FullName}</td>
                <td>{election.NIC}</td>
                <td>{election.VoterStatus}</td>
                <td>{election.Email}</td>
                <td>{election.FamilyReferenceNumber}</td>
                <td>{new Date(election.Birthdate).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDelete(election._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {toastMessage && <div className="toast">{toastMessage}</div>}
    </div>
  );
};

export default DeleteSubmissions;
