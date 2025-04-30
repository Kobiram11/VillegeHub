const { sendEmail } = require('../utils/emailService'); // Adjust the path if needed

const express = require('express');
const ElectionModel = require('../models/electionModel');
const router = express.Router();

// Create a new election item
router.post('/add', async (req, res) => {
    const { FullName, NIC, VoterStatus, Email, FamilyReferenceNumber, Birthdate } = req.body;
    try {
        const newElection = new ElectionModel({ FullName, NIC, VoterStatus, Email, FamilyReferenceNumber, Birthdate });
        await newElection.save();

        console.log('Attempting to send email to:', Email);

        await sendEmail(
            Email,
            'Welcome to Election Management',
            `Hello ${FullName},\n\nYour details have been successfully registered in our election management system.`
        );

        console.log('Email function completed without errors');

        res.status(201).json(newElection);
    } catch (error) {
        console.error('Error in /add route:', error);
        res.status(500).json({ message: error.message });
    }
});




// Get all items or filter by VoterStatus
router.get('/get', async (req, res) => {
    try {
        const { voterStatus } = req.query;
        let query = {};

        if (voterStatus) {
            query.VoterStatus = voterStatus;
        }

        const elections = await ElectionModel.find(query);
        res.json(elections);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// Route to fetch a person by NIC
router.get('/nic/:nic', async (req, res) => {
    try {
        const person = await ElectionModel.findOne({ NIC: req.params.nic });
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.json(person);
    } catch (error) {
        console.error('Error fetching person:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// Update a person by NIC
router.put('/update', async (req, res) => { // Make sure this is marked as async
    const { NIC, FullName, VoterStatus, Email, FamilyReferenceNumber, Birthdate } = req.body;
    
    try {
        const updatedPerson = await ElectionModel.findOneAndUpdate(
            { NIC: NIC }, // Find person by NIC
            { FullName, VoterStatus, Email, FamilyReferenceNumber, Birthdate }, // Update fields
            { new: true } // Return updated document
        );

        if (!updatedPerson) {
            return res.status(404).json({ message: 'Person not found' });
        }

        // Send email after updating the user
        await sendEmail(
            Email,
            'Your Details Have Been Updated',
            `Hello ${FullName},\n\nYour details have been successfully updated in our election management system.`
        );

        res.json({ message: 'Update successful!', updatedPerson });
    } catch (error) {
        console.error('Error updating person:', error);
        res.status(500).json({ error: 'Failed to update. Please try again.' });
    }
});



// Delete an election item
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await ElectionModel.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// Filter over 18
router.get('/over18', async (req, res) => {
    try {
        const today = new Date();
        const cutoffDate = new Date(today.setFullYear(today.getFullYear() - 18));  // Calculate the cutoff date

        const elections = await ElectionModel.find({
            Birthdate: { $lte: cutoffDate }  // Find people whose birthdate makes them 18+
        });
        
        res.json(elections);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;  
