import React, { useState } from 'react';
import axios from 'axios';

const DeleteHouse = ({ house, onDeleteSuccess }) => {
    const [confirmHouseNumber, setConfirmHouseNumber] = useState('');
    const [error, setError] = useState('');
    
    const handleDelete = async () => {
        if (confirmHouseNumber !== house.houseNumber) {
            setError('House number does not match!');
            return;
        }

        try {
            await axios.delete(`http://localhost:8070/api/delete/${house.houseNumber}`);

            onDeleteSuccess(); // Callback to refresh the house list or perform any other action
        } catch (error) {
            setError(error.response ? error.response.data.error : 'Something went wrong!');
        }
    };

    return (
        <div>
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete the house: {house.houseNumber}?</p>
            <input
                type="text"
                placeholder="Re-type house number"
                value={confirmHouseNumber}
                onChange={(e) => setConfirmHouseNumber(e.target.value)}
            />
            <button onClick={handleDelete}>Delete</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default DeleteHouse;
