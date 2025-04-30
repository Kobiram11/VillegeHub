// File: backend/routes/appointmentRoutes.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const appointModel = require('../models/appointmentModel');
const generateAppointmentId = require('../utils/generateAppointmentId'); // Updated utility function
const sendMail = require('../utils/email');
const ejs = require('ejs');
const path = require('path');

// Create a new appointment with date and time
router.post('/appoint', async (req, res) => {
    const { name, date, time, purpose, contact, email } = req.body;

    try {
        const appointmentId = await generateAppointmentId(); // Generate appointment ID

        // Check if the selected time slot is available
        const existingAppointment = await appointModel.findOne({ date, time });
        if (existingAppointment) {
            return res.status(400).json({ message: 'Time slot not available' });
        }

        const newAppoint = new appointModel({ appointmentId, name, date, time, purpose, contact, email });
        await newAppoint.save();

        const data = {
            user: { name },
            appointmentId,
            date,
            time,
            purpose,
            contact,
            email
        };

        try {
            await sendMail({
                email: email,
                subject: 'Appointment Confirmation',
                template: 'appointment-email.ejs', // Path to your ejs template
                data: data
            });
        } catch (error) {
            console.log(error)
        }
        res.status(201).json(newAppoint); // Return the newly created appointment

        // Send email confirmation as before...

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});


// Get all appointments
router.get('/appoint', async (req, res) => {
    try {
        const appointments = await appointModel.find(); // Fetch all appointments
        res.json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Delete appointment by ID
router.delete('/appointments/:appointmentId', async (req, res) => {
    const { appointmentId } = req.params;

    try {
        const appointmentData = await appointModel.findOne({appointmentId:appointmentId});
        console.log(appointmentData)
        const data = {
            user: appointmentData.name,
            appointmentId: appointmentData.appointmentId,
            date:appointmentData.date,
            time:appointmentData.time,
            purpose:appointmentData.purpose,
            contact:appointmentData.contact,
            email:appointmentData.email
        };

        try {
            await sendMail({
                email: appointmentData.email,
                subject: 'Appointment Cancellation',
                template: 'appointment-email-cancel.ejs', // Path to your ejs template
                data: data
            });
        } catch (error) {
            console.log(error)
        }


        const appointment = await appointModel.findOneAndDelete({ appointmentId });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ message: 'Error deleting appointment' });
    }
});

// Update appointment status by ID
router.put('/appointments/:id/status', async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const { status } = req.body;

        // Validate status input
        if (!['normal', 'urgent'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        // Find and update appointment status
        const updatedAppointment = await appointModel.findByIdAndUpdate(
            appointmentId,
            { status },
            { new: true } // Return the updated document
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json(updatedAppointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating appointment status', error });
    }
});


// Check if a time slot is available and within the valid range (10 AM to 3 PM)
router.post('/appoint/check-availability', async (req, res) => {
    const { date, time } = req.body;

    try {
        // Convert time to a Date object for easier comparison
        const appointmentTime = new Date(`${date} ${time}`);
        const startTime = new Date(`${date} 10:00 AM`);
        const endTime = new Date(`${date} 3:00 PM`);

        // Check if the selected time is within the valid range
        if (appointmentTime < startTime || appointmentTime >= endTime) {
            return res.status(400).json({ message: 'Time slot is outside the allowed range (10:00 AM - 3:00 PM).' });
        }

        // Check if the slot is already booked
        const appointment = await appointModel.findOne({ date, time });
        if (appointment) {
            return res.status(400).json({ message: 'Time slot not available' });
        }

        res.status(200).json({ message: 'Time slot available' });
    } catch (error) {
        res.status(500).json({ message: 'Error checking availability', error });
    }
});


// Get unavailable time slots for a date
router.post('/appoint/unavailable-slots', async (req, res) => {
    const { date } = req.body;

    try {
        // Find all appointments for the selected date
        const appointments = await appointModel.find({ date });

        // Extract and return all booked time slots
        const unavailableSlots = appointments.map(appointment => appointment.time);
        res.status(200).json({ unavailableSlots });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching unavailable time slots', error });
    }
});

// Fetch appointment by appointmentId
router.get('/appoint/:id', async (req, res) => {
    const appointmentId = req.params.id;
    try {
        const appointment = await appointModel.findOne({ appointmentId }); // Fetch based on appointmentId
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointment', error });
    }
});

// Update appointment purpose by ID
router.put('/appoint/:id', async (req, res) => {
    const appointmentId = req.params.id;
    const { purpose } = req.body;

    try {
        const updatedAppointment = await appointModel.findOneAndUpdate(
            { appointmentId },
            { purpose },
            { new: true } // Return the updated document
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json(updatedAppointment);
    } catch (error) {
        console.error('Error updating appointment:', error);  // Log the error details
        res.status(500).json({ message: 'Error updating appointment', error });
    }
});




router.post('/send-confirmation-email', async (req, res) => {
    const { name, email, appointmentId, date, time, purpose, contact } = req.body;

    const data = {
        user: { name },
        appointmentId,
        date,
        time,
        purpose,
        contact,
        email
    };

    try {
        // Call sendMail function with the appropriate data
        await sendMail({
            email: email,
            subject: 'Appointment Confirmation',
            template: 'appointment-email.ejs', // Path to your ejs template
            data: data
        });

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
    }
});















module.exports = router;
