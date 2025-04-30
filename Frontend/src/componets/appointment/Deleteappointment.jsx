import React, { useState } from 'react';
import '../../Styles/appointment.css'; // For custom styles

const DeleteAppointment = () => {
    const [appointmentId, setAppointmentId] = useState(''); // State for storing the input ID
    const [message, setMessage] = useState(''); // State for feedback messages

    // Handle delete action
    const handleDelete = async () => {
        if (!appointmentId) {
            alert("Please enter an appointment ID to delete.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8070/Appointment/appointments/${appointmentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setMessage('Appointment deleted successfully');
                setAppointmentId(''); // Clear the input field
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
                setMessage(''); // Clear any previous messages
            }
        } catch (error) {
            console.error('Error deleting appointment:', error);
            setMessage('An error occurred while deleting the appointment.');
        }
    };

    return (
        <div className="delete-container">
            <h1 className="delete-title">Delete Appointment</h1>
            <input
                type="text"
                className="delete-input"
                placeholder="Enter Appointment ID"
                value={appointmentId}
                onChange={(e) => setAppointmentId(e.target.value)}
            />
            <button className="delete-button" onClick={handleDelete}>Delete Appointment</button>
            {message && <p className="delete-message">{message}</p>} {/* Display feedback message */}
        </div>
    );
};

export default DeleteAppointment;
