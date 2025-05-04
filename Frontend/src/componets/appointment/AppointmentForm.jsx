import React, { useState, useEffect, useContext } from 'react';
import '../../Styles/appointment.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../../App';

const AppointmentForm = ({ fetchAppointments }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        purpose: '',
        contact: '',
        email: ''
    });

    const [timeSlots, setTimeSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [closeWarning, setCloseWarning] = useState(false);
    const [minDate, setMinDate] = useState('');
    const [showLoginWarning, setShowLoginWarning] = useState(false); // NEW

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const generateTimeSlots = () => {
        const slots = [];
        let currentTime = new Date();
        currentTime.setHours(9, 0, 0);

        const endTime = new Date();
        endTime.setHours(15, 0, 0);

        while (currentTime <= endTime) {
            const hours = String(currentTime.getHours()).padStart(2, '0');
            const minutes = String(currentTime.getMinutes()).padStart(2, '0');
            slots.push(`${hours}:${minutes}`);
            currentTime.setMinutes(currentTime.getMinutes() + 30);
        }

        return slots;
    };

    const validateForm = () => {
        const newErrors = {};
        const today = new Date().toISOString().split('T')[0];

        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.date) {
            newErrors.date = "Date is required";
        } else if (formData.date < today) {
            newErrors.date = "Date cannot be in the past";
        }
        if (!formData.time) newErrors.time = "Time is required";
        if (!formData.purpose) newErrors.purpose = "Purpose is required";
        if (!/^\d{10}$/.test(formData.contact)) {
            newErrors.contact = "Contact number must be exactly 10 digits";
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Valid email is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isAfterSevenAM = () => {
        const selectedDate = new Date(formData.date);
        const [selectedHours] = formData.time.split(':').map(Number);
        const now = new Date();
        return (
            selectedDate.toDateString() === now.toDateString() &&
            selectedHours >= 7 &&
            now.getHours() >= 7
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (isAfterSevenAM()) {
            setCloseWarning(true);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:8070/Appointment/appoint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setShowModal(true);
                const appointment = await response.json();

                await fetch('http://localhost:8070/send-confirmation-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        appointmentId: appointment.id,
                        date: formData.date,
                        time: formData.time,
                        purpose: formData.purpose,
                        contact: formData.contact,
                    })
                });

                setFormData({ name: '', date: '', time: '', purpose: '', contact: '', email: '' });
                fetchAppointments();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error creating appointment:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setTimeSlots(generateTimeSlots());
        const today = new Date().toISOString().split('T')[0];
        setMinDate(today);

        if (!isAuthenticated) {
            setShowLoginWarning(true); // Show login popup if not authenticated
        }
    }, [isAuthenticated]);

    return (
        <div className="appointment-form-container">
            <h1>Appointment Form</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={!isAuthenticated}
                    />
                    {errors.name && <small className="text-danger">{errors.name}</small>}
                </div>
                <div className="mb-3">
                    <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={minDate}
                        required
                        disabled={!isAuthenticated}
                    />
                    {errors.date && <small className="text-danger">{errors.date}</small>}
                </div>
                <div className="mb-3">
                    <select
                        className="form-select"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        disabled={!isAuthenticated}
                    >
                        <option value="">Select Time</option>
                        {timeSlots.map((timeSlot) => (
                            <option key={timeSlot} value={timeSlot}>{timeSlot}</option>
                        ))}
                    </select>
                    {errors.time && <small className="text-danger">{errors.time}</small>}
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="purpose"
                        placeholder="Purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        required
                        disabled={!isAuthenticated}
                    />
                    {errors.purpose && <small className="text-danger">{errors.purpose}</small>}
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="contact"
                        placeholder="Contact (10 digits)"
                        value={formData.contact}
                        onChange={handleChange}
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength={10}
                        onKeyDown={(e) => {
                            if (e.key !== 'Backspace' && e.key !== 'Delete' && isNaN(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        required
                        disabled={!isAuthenticated}
                    />
                    {errors.contact && <small className="text-danger">{errors.contact}</small>}
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={!isAuthenticated}
                    />
                    {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>
                <div className="button-container">
                    <button type="submit" className="btn btn-primary" disabled={loading || !isAuthenticated}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setFormData({ name: '', date: '', time: '', purpose: '', contact: '', email: '' })}
                        disabled={!isAuthenticated}
                    >
                        Reset
                    </button>
                </div>
            </form>

            {/* Success Modal */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Appointment Confirmation</h5>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <p>Your appointment has been successfully created! Check your email for the appointment ID.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => setShowModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Closure Warning Modal */}
            <div className={`modal fade ${closeWarning ? 'show' : ''}`} style={{ display: closeWarning ? 'block' : 'none' }} role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Time Restriction</h5>
                            <button type="button" className="btn-close" onClick={() => setCloseWarning(false)}></button>
                        </div>
                        <div className="modal-body">
                            <p>Appointments cannot be scheduled after 7:00 AM on the same day.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => setCloseWarning(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Required Modal */}
            <div className={`modal fade ${showLoginWarning ? 'show' : ''}`} style={{ display: showLoginWarning ? 'block' : 'none' }} role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Login Required</h5>
                            <button type="button" className="btn-close" onClick={() => setShowLoginWarning(false)}></button>
                        </div>
                        <div className="modal-body">
                            <p>You must be logged in to fill out and submit this appointment form.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => setShowLoginWarning(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentForm;
