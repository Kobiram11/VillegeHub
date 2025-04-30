import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import AppointmentReport from './AppointmentReport'; // Import the AppointmentReport component
import '../../Styles/appointment.css'; // Import the custom CSS

const TodayAppointments = ({ appointments }) => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0]; // Get current date as 'YYYY-MM-DD'

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    useEffect(() => {
        const todayAppointments = appointments.filter(appointment => {
            const appointmentDate = new Date(appointment.date).toISOString().split('T')[0];
            return appointmentDate === todayString;
        });

        const filtered = todayAppointments.filter(appointment =>
            appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.purpose.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredAppointments(filtered);
    }, [appointments, searchTerm, todayString]);

    // Function to handle appointment cancellation
    const cancelAppointment = async (appointmentId) => {
        const confirmCancel = window.confirm('Do you really want to cancel this appointment?');
        if (confirmCancel) {
            try {
                const response = await fetch(`http://localhost:8070/Appointment/appointments/${appointmentId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Remove the canceled appointment from the state
                    setFilteredAppointments(prevAppointments =>
                        prevAppointments.filter(appointment => appointment.appointmentId !== appointmentId)
                    );
                    alert('Appointment canceled successfully.');
                } else {
                    alert('Error canceling the appointment.');
                }
            } catch (error) {
                console.error('Error canceling appointment:', error);
                alert('Error canceling the appointment.');
            }
        }
    };

    return (
        <div className="container p-4 today-appointments-container">
            <h3 className="text-center mb-4 title">Today's Appointments ({todayString})</h3>

            {/* Search bar */}
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Search appointments by name or purpose..."
                    className="form-control search-bar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Appointment list */}
            <ul className="list-group appointments-list mb-3">
                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map(appointment => (
                        <li key={appointment.appointmentId} className="list-group-item d-flex justify-content-between align-items-center appointment-item">
                            <div className="appointment-details">
                                <strong>ID:</strong> {appointment.appointmentId} - 
                                <strong>Name:</strong> {appointment.name} - 
                                <strong>Time:</strong> {appointment.time} - 
                                <strong>Purpose:</strong> {appointment.purpose} -
                                <strong>Email:</strong> {appointment.email}
                            </div>
                            <button
                                className="btn dashboard-button"
                                onClick={() => cancelAppointment(appointment.appointmentId)}
                            >
                                Cancel Appointment
                            </button>
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">No appointments for today.</li>
                )}
            </ul>

            {/* Generate Report Button */}
            {filteredAppointments.length > 0 && (
                <div className="text-center">
                    <PDFDownloadLink
                        document={<AppointmentReport appointments={filteredAppointments} date={todayString} />}
                        fileName={`appointments_report_${todayString}.pdf`}
                        className="btn dashboard-button"
                    >
                        {({ loading }) => (loading ? 'Loading report...' : 'Generate Report')}
                    </PDFDownloadLink>
                </div>
            )}
        </div>
    );
};

export default TodayAppointments;
