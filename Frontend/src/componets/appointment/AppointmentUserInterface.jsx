import React, { useState } from 'react';
import AppointmentForm from './AppointmentForm';
import AppointmentUpdate from './UpdateAppointment';
import DeleteAppointment from './Deleteappointment';
import '../../Styles/appointment.css'

const AppointmentUserInterface = () => {
    const [activeTab, setActiveTab] = useState('form'); // Manage active component state

    return (
        <div className="appointments-container">
            <h2>Appointment Management</h2>

            {/* Tab buttons to switch between components */}
            <div className="appointments-buttons">
                <button
                    className={`tab-button ${activeTab === 'form' ? 'active' : ''}`}
                    onClick={() => setActiveTab('form')}
                >
                    Create Appointment
                </button>
                <button
                    className={`tab-button ${activeTab === 'update' ? 'active' : ''}`}
                    onClick={() => setActiveTab('update')}
                >
                    Update Appointment
                </button>
                <button
                    className={`tab-button ${activeTab === 'delete' ? 'active' : ''}`}
                    onClick={() => setActiveTab('delete')}
                >
                    Delete Appointment
                </button>
            </div>

            {/* Render the appropriate component based on the active tab */}
            <div className="appointment-section">
                {activeTab === 'form' && <AppointmentForm />}
                {activeTab === 'update' && <AppointmentUpdate />}
                {activeTab === 'delete' && <DeleteAppointment />}
            </div>
        </div>
    );
};

export default AppointmentUserInterface;
