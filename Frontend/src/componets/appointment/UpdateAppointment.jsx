import React, { useState } from 'react';
import axios from 'axios';
import '../../Styles/appointment.css'; // Import custom styles

const Appointmentupdate = () => {
    const [appointmentId, setAppointmentId] = useState('');
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const [purpose, setPurpose] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch appointment details by ID
    const fetchAppointment = async (id) => {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage(''); // Clear any previous success messages

        try {
            const response = await axios.get(`http://localhost:8070/Appointment/appoint/${id}`);
            if (response.data && response.data._id) {
                setAppointmentDetails(response.data);
                setPurpose(response.data.purpose); // Set purpose for editing
            } else {
                setErrorMessage('Appointment not found.');
            }
        } catch (error) {
            setErrorMessage('Error fetching appointment. Please check the appointment ID.');
        } finally {
            setLoading(false);
        }
    };

    // Handle fetch submit
    const handleFetchSubmit = (e) => {
        e.preventDefault();
        if (!appointmentId.trim()) {
            setErrorMessage('Please enter a valid appointment ID.');
            return;
        }
        fetchAppointment(appointmentId);
    };

    // Handle update submit
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        if (!appointmentDetails) return;

        setUpdating(true);
        setErrorMessage(''); // Clear any previous error messages
        setSuccessMessage(''); // Clear any previous success messages

        try {
            await axios.put(`http://localhost:8070/Appointment/appoint/${appointmentId}`, { purpose });
            setSuccessMessage('Appointment purpose updated successfully!');
        } catch (error) {
            setErrorMessage('Failed to update appointment. Please try again.');
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="appointment-update-container">
            <h2 className="title">View and Edit Appointment</h2>

            {/* Form to enter appointment ID */}
            <form onSubmit={handleFetchSubmit} className="form-section">
                <div className="form-group">
                    <label htmlFor="appointmentId">Enter Appointment ID</label>
                    <input
                        type="text"
                        id="appointmentId"
                        className="form-control"
                        value={appointmentId}
                        onChange={(e) => setAppointmentId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="fetch-button" disabled={loading}>
                    {loading ? 'Loading...' : 'Fetch Appointment'}
                </button>
            </form>

            {/* Display appointment details if fetched */}
            {appointmentDetails && (
                <div className="details-section">
                    <h3>Appointment Details</h3>
                    <p><strong>ID:</strong> {appointmentDetails.appointmentId}</p>
                    <p><strong>Name:</strong> {appointmentDetails.name}</p>
                    <p><strong>Date:</strong> {new Date(appointmentDetails.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {appointmentDetails.time}</p>
                    <p><strong>Contact:</strong> {appointmentDetails.contact}</p>
                    <p><strong>Email:</strong> {appointmentDetails.email}</p>
                    <p><strong>Purpose:</strong> {appointmentDetails.purpose}</p>

                    {/* Form to edit purpose */}
                    <form onSubmit={handleUpdateSubmit} className="form-section">
                        <div className="form-group">
                            <label htmlFor="purpose">Edit Purpose</label>
                            <input
                                type="text"
                                id="purpose"
                                className="form-control"
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="update-btn" disabled={updating} >
                            {updating ? 'Updating...' : 'Update Purpose'}
                        </button>
                    </form>
                </div>
            )}

            {errorMessage && <p className="text-danger error-message">{errorMessage}</p>}
            {successMessage && <p className="text-success success-message">{successMessage}</p>}
        </div>
    );
};

export default Appointmentupdate;
