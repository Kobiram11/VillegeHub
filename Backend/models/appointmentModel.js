// File: backend/models/appointmentModel.js

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    appointmentId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: { 
        type: String, // Storing time as a string in "HH:mm" format
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['normal', 'urgent'],
        default: 'normal',
    },
});

module.exports = mongoose.model('Appointment', appointmentSchema);

