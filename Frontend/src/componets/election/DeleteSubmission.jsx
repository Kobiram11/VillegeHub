import React, { useEffect, useState } from 'react';

const DeleteSubmissions = () => {
    const [elections, setElections] = useState([]);

    const fetchElections = async () => {
        try {
            const response = await fetch('http://localhost:8070/election/get');
            const data = await response.json();
            setElections(data);
        } catch (error) {
            console.error('Error fetching elections:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8070/election/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setElections((prevElections) => prevElections.filter((election) => election._id !== id));
                alert('Election submission deleted successfully!');
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
        <div>
            <h2>Delete Election Submissions</h2>
            {elections.length === 0 ? (
                <p>No submissions available.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Full Name</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>NIC</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Voter Status</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Family Reference Number</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Birthdate</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elections.map((election) => (
                            <tr key={election._id}>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{election.FullName}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{election.NIC}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{election.VoterStatus}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{election.Email}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{election.FamilyReferenceNumber}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{new Date(election.Birthdate).toLocaleDateString()}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>
                                    <button
                                        onClick={() => handleDelete(election._id)}
                                        style={{ color: 'red' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DeleteSubmissions;
