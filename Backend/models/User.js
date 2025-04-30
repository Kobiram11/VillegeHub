const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
        unique: true, // Ensure the User ID is unique
    },    
    fullName: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
        enum: ['Grama Niladhari', 'Resident','Divisional Secrateriat'], // Example of fixed user types
    },
    nic: {
        type: String,
        required: true,
        unique: true, // Ensure NIC is unique
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number'],
    },
    password: {
        type: String,
        required: true,
    },
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
