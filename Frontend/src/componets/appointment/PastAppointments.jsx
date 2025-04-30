import React, { useState, useEffect } from 'react';
import '../../Styles/appointment.css'; // Import the custom CSS for styling

const PastAppointments = ({ appointments, setAppointments }) => {
    const today = new Date().toISOString().split('T')[0]; // Extracts just the 'YYYY-MM-DD' part

    const [searchTerm, setSearchTerm] = useState(''); // State to store the search term
    const [selectedDate, setSelectedDate] = useState(''); // State to store the selected date
    const [filteredAppointments, setFilteredAppointments] = useState([]); // State for filtered appointments
    const [selectedAppointments, setSelectedAppointments] = useState([]); // State for selected appointments

    // Helper function to format the date to "Month Day, Year" (e.g., "October 12, 2024")
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Filter appointments where the date is strictly before today
    const pastAppointments = appointments.filter(appointment => appointment.date.split('T')[0] < today);

    // Further filter appointments based on search term
    useEffect(() => {
        const filtered = pastAppointments.filter(appointment =>
            appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.purpose.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Filter appointments by selected date if applicable
        const appointmentsToDisplay = selectedDate
            ? filtered.filter(appointment => appointment.date.split('T')[0] === selectedDate)
            : filtered;

        setFilteredAppointments(appointmentsToDisplay);
    }, [appointments, searchTerm, selectedDate, pastAppointments]);

    // Function to handle appointment deletion
    const deleteAppointments = async () => {
        const confirmDelete = window.confirm('Do you really want to delete the selected appointments?');
        if (confirmDelete) {
            try {
                // Create a promise for each deletion request
                const deletePromises = selectedAppointments.map(appointmentId =>
                    fetch(`http://localhost:8070/Appointment/appointments/${appointmentId}`, {
                        method: 'DELETE',
                    })
                );

                const responses = await Promise.all(deletePromises);

                const allDeleted = responses.every(response => response.ok);
                if (allDeleted) {
                    // Remove the deleted appointments from the state
                    setFilteredAppointments(prevAppointments =>
                        prevAppointments.filter(appointment => !selectedAppointments.includes(appointment.appointmentId))
                    );
                    alert('Selected appointments deleted successfully.');
                } else {
                    alert('Error deleting some appointments.');
                }
            } catch (error) {
                console.error('Error deleting appointments:', error);
                alert('Error deleting the appointments.');
            }
        }
    };

    // Get unique dates from past appointments for the dropdown (using raw date without time part)
    const uniqueDates = [...new Set(pastAppointments.map(appointment => appointment.date.split('T')[0]))];

    return (
        <div className="past-appointments-container">
            <h3 className="past-appointments-title">Past Appointments</h3>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search past appointments by name or purpose..."
                className="search-bar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Date Dropdown */}
            <select
                className="date-dropdown"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
            >
                <option value="">All Dates</option>
                {uniqueDates.map(date => (
                    <option key={date} value={date}>
                        {formatDate(date)}
                    </option>
                ))}
            </select>

            {/* Button to Delete Selected Appointments */}
            <button
                className="btn btn-danger mb-2"
                onClick={deleteAppointments}
                disabled={selectedAppointments.length === 0}
            >
                Delete Selected Appointments
            </button>

            <ul className="past-appointments-list">
                {filteredAppointments.length > 0 ? filteredAppointments.map(appointment => (
                    <li key={appointment.appointmentId} className="appointment-item">
                        <input
                            type="checkbox"
                            checked={selectedAppointments.includes(appointment.appointmentId)}
                            onChange={() => {
                                setSelectedAppointments(prevSelected =>
                                    prevSelected.includes(appointment.appointmentId)
                                        ? prevSelected.filter(id => id !== appointment.appointmentId)
                                        : [...prevSelected, appointment.appointmentId]
                                );
                            }}
                        />
                        <span className="appointment-line">
                            <strong>ID:</strong> {appointment.appointmentId}
                        </span>
                        <span className="appointment-line">
                            <strong>Name:</strong> {appointment.name}
                        </span>
                        <span className="appointment-line">
                            <strong>Date:</strong> {formatDate(appointment.date.split('T')[0])}
                        </span>
                        <span className="appointment-line">
                            <strong>Purpose:</strong> {appointment.purpose}
                        </span>
                        <span className="appointment-line">
                        <strong>Email:</strong> {appointment.email}
                        </span>
                    </li>
                )) : <li className="no-appointments">No past appointments found.</li>}
            </ul>
        </div>
    );
};

export default PastAppointments;
