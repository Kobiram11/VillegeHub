import React, { useState, useEffect } from 'react';
import '../../Styles/appointment.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppointmentForm = ({ fetchAppointments }) => {
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        purpose: '',
        contact: '',
        email: ''
    });

    const [timeSlots, setTimeSlots] = useState([]); // To hold available time slots
    const [loading, setLoading] = useState(false); // Loading state for form submission
    const [errors, setErrors] = useState({}); // Store form validation errors
    const [showModal, setShowModal] = useState(false); // State for success modal visibility
    const [closeWarning, setCloseWarning] = useState(false); // State for closure warning modal
    const [minDate, setMinDate] = useState(''); // State for min selectable date

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Function to generate time slots in 30-minute intervals
    const generateTimeSlots = () => {
        const slots = [];
        let currentTime = new Date();
        currentTime.setHours(9, 0, 0); // Start from 9:00 AM

        const endTime = new Date();
        endTime.setHours(15, 0, 0); // End at 3:00 PM

        while (currentTime <= endTime) {
            const hours = String(currentTime.getHours()).padStart(2, '0');
            const minutes = String(currentTime.getMinutes()).padStart(2, '0');
            slots.push(`${hours}:${minutes}`);
            currentTime.setMinutes(currentTime.getMinutes() + 30); // Increment by 30 minutes
        }

        return slots;
    };

    // Basic form validation
    const validateForm = () => {
        const newErrors = {};
        const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format

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

    // Check if the selected date is today and time is after 7:00 AM
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

        if (!validateForm()) return; // Prevent submission if validation fails

        if (isAfterSevenAM()) {
            setCloseWarning(true); // Show warning if time is after 7:00 AM
            return;
        }

        setLoading(true); // Start loading
        try {
            const response = await fetch('http://localhost:8070/Appointment/appoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setShowModal(true); // Show success modal
                const appointment = await response.json(); // Assuming the response contains the appointment data

                // Trigger the backend route to send the confirmation email
                await fetch('http://localhost:8070/send-confirmation-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        appointmentId: appointment.id, // Assuming the ID is returned in the response
                        date: formData.date,
                        time: formData.time,
                        purpose: formData.purpose,
                        contact: formData.contact,
                    })
                });

                setFormData({ name: '', date: '', time: '', purpose: '', contact: '', email: '' });
                fetchAppointments(); // Refresh appointments list
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error creating appointment:', error);
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        setTimeSlots(generateTimeSlots()); // Generate time slots on mount
        const today = new Date().toISOString().split('T')[0];
        setMinDate(today); // Prevent selecting past dates
    }, []);

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
                    />
                    {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>
                <div className="button-container">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setFormData({ name: '', date: '', time: '', purpose: '', contact: '', email: '' })}
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
                            <p>Your appointment has been successfully created! Check Your Email and Get the Appoitment ID</p>
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
        </div>
    );
};

export default AppointmentForm;
