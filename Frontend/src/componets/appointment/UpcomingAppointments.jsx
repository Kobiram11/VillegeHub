import React, { useEffect, useState } from 'react';
import AppointmentPDFDownload from './upcomingAppointmentReport'; // Import PDF component
import '../../Styles/appointment.css'; // Import custom CSS

const UpcomingAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    // Fetch appointments from the backend
    const fetchAppointments = async () => {
        try {
            const response = await fetch('http://localhost:8070/Appointment/appoint');
            const data = await response.json();
            setAppointments(data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    // Helper to format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Helper to check if the appointment is upcoming
    const isUpcomingAppointment = (appointmentDate) => {
        const currentDate = new Date();
        const appointment = new Date(appointmentDate);
        return appointment > currentDate.setHours(23, 59, 59, 999); // Excludes today
    };

    // Filter by search term and upcoming appointments
    const filteredAppointments = appointments.filter(
        (appointment) =>
            isUpcomingAppointment(appointment.date) &&
            (appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             appointment.purpose.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Group and sort by date
    const groupAppointmentsByDate = (appointments) =>
        appointments.reduce((grouped, appointment) => {
            const appointmentDate = new Date(appointment.date).toDateString();
            if (!grouped[appointmentDate]) grouped[appointmentDate] = [];
            grouped[appointmentDate].push(appointment);
            return grouped;
        }, {});

    const groupedAppointments = groupAppointmentsByDate(filteredAppointments);

    // Get the list of unique dates
    const appointmentDates = Object.keys(groupedAppointments);

    // Filter by the selected date
    const filteredBySelectedDate = selectedDate
        ? { [selectedDate]: groupedAppointments[selectedDate] }
        : groupedAppointments;

    // Cancel appointment function
    const cancelAppointmentUpcoming = async (appointmentId) => {
        const confirmCancel = window.confirm('Do you really want to cancel this appointment?');
        if (confirmCancel) {
            try {
                const response = await fetch(
                    `http://localhost:8070/Appointment/appointments/${appointmentId}`,
                    { method: 'DELETE' }
                );

                if (response.ok) {
                    alert('Appointment canceled successfully.');
                    fetchAppointments();
                } else {
                    alert('Failed to cancel the appointment.');
                }
            } catch (error) {
                console.error('Error canceling the appointment:', error);
                alert('An error occurred while canceling the appointment.');
            }
        }
    };

    return (
        <div className="appointment-section">
            <h3 className="mb-4">Upcoming Appointments</h3>

            <input
                type="text"
                placeholder="Search by name or purpose..."
                className="form-control mb-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
                className="form-control mb-4"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
            >
                <option value="">All Dates</option>
                {appointmentDates.map((date) => (
                    <option key={date} value={date}>
                        {formatDate(date)}
                    </option>
                ))}
            </select>

            {Object.keys(filteredBySelectedDate).map((date) => (
                <div key={date} className="appointment-date-section">
                    <h4 className="mt-4">{formatDate(date)}</h4>
                    <ul className="list-group">
                        {filteredBySelectedDate[date].map((appointment) => (
                            <li
                                key={appointment.appointmentId}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <div>
                                    <strong>ID:</strong> {appointment.appointmentId} - 
                                    <strong>Name:</strong> {appointment.name} - 
                                    <strong>Time:</strong> {appointment.time} - 
                                    <strong>Purpose:</strong> {appointment.purpose} - 
                                    <strong>Email:</strong> {appointment.email}
                                </div>
                                <button
                                    className="btn dashboard-button btn-sm"
                                    onClick={() => cancelAppointmentUpcoming(appointment.appointmentId)}
                                >
                                    Cancel Appointment
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            {filteredAppointments.length === 0 && <p>No upcoming appointments available.</p>}

            {/* PDF Download Button */}
            {selectedDate && (
                <AppointmentPDFDownload
                    appointments={filteredBySelectedDate[selectedDate] || []}
                    selectedDate={selectedDate}
                />
            )}
        </div>
    );
};

export default UpcomingAppointments;
