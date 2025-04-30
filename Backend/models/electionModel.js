const mongoose = require('mongoose');

// Define schema
const electionSchema = new mongoose.Schema({
    FullName: { required: true, type: String },
    NIC: { required: true, type: String },
    VoterStatus: { required: true, type: String },
    Email: { required: true, type: String },
    FamilyReferenceNumber: { required: true, type: String },
    Birthdate: { type: Date } // Add Birthdate field
}, { timestamps: true });

// Create model
const ElectionModel = mongoose.model('Election', electionSchema);

module.exports = ElectionModel;
