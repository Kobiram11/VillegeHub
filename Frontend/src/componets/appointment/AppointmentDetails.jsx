import React, { useEffect, useState } from 'react';
import TodayAppointments from './TodayAppointments';
import UpcomingAppointments from './UpcomingAppointments';
import PastAppointments from './PastAppointments';
import '../../Styles/appointment.css'; // Import custom CSS for additional styles

const ViewAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [activeSection, setActiveSection] = useState('today'); // State to track the active section

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
        fetchAppointments(); // Fetch appointments when the component mounts
    }, []);

    return (
        <div className="container py-4" style={{ backgroundColor: '#fefae0', color: '#d4a373' }}>
            <h2 className="mb-4">Appointments</h2>
            <div className="mb-4">
                <button
                    className="btn dashboard-button mx-2"
                    onClick={() => setActiveSection('today')}
                >
                    Today's Appointments
                </button>
                <button
                    className="btn dashboard-button mx-2"
                    onClick={() => setActiveSection('upcoming')}
                >
                    Upcoming Appointments
                </button>
                <button
                    className="btn dashboard-button mx-2"
                    onClick={() => setActiveSection('past')}
                >
                    Past Appointments
                </button>
            </div>

            <div className="appointment-section">
                {activeSection === 'today' && <TodayAppointments appointments={appointments} />}
                {activeSection === 'upcoming' && <UpcomingAppointments/>}
                {activeSection === 'past' && <PastAppointments appointments={appointments} />}
            </div>
        </div>
    );
};

export default ViewAppointments;
