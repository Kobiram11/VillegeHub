const express = require('express');
const router = express.Router();
const Procedure = require('../models/procedureModel');

// Create a new procedure
router.post('/create', async (req, res) => {
    const { ServiceName, ServiceDetail } = req.body;
    try {
        const newProcedure = new Procedure({ ServiceName, ServiceDetail });
        await newProcedure.save();
        res.status(201).json(newProcedure);
    } catch (error) {
        console.log('Error creating procedure:', error);
        res.status(500).json({ message: error.message });
    }
});

// Update a procedure by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { ServiceName, ServiceDetail } = req.body;

    try {
        const procedure = await Procedure.findByIdAndUpdate(
            id,
            { ServiceName, ServiceDetail },
            { new: true, runValidators: true }
        );

        if (!procedure) {
            return res.status(404).json({ message: 'Procedure not found' });
        }

        res.status(200).json(procedure);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Delete a procedure by ServiceID
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const procedure = await Procedure.findByIdAndDelete(id);
        if (!procedure) {
            return res.status(404).json({ message: 'Procedure not found' });
        }
        res.status(204).end(); // No content for successful deletion
    } catch (error) {
        console.error('Error deleting procedure:', error);
        res.status(500).json({ message: 'Error deleting procedure.' });
    }
});

// Search procedures by ServiceName
router.get('/search', async (req, res) => {
    const { name } = req.query;
    try {
        if (!name) {
            return res.status(400).json({ message: 'Name parameter is required' });
        }

        const procedures = await Procedure.find(
            { ServiceName: new RegExp(name, 'i') }, // Case-insensitive search
            'ServiceID ServiceName ServiceDetail createdAt updatedAt'
        );

        if (procedures.length === 0) {
            return res.status(404).json({ message: 'No procedures found' });
        }

        res.json(procedures);
    } catch (error) {
        console.error('Error searching procedures:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all procedures
router.get('/get', async (req, res) => {
    try {
        const procedures = await Procedure.find({}, 'ServiceName ServiceDetail createdAt updatedAt');
        res.json(procedures);
    } catch (error) {
        console.error('Error getting procedures:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get a specific procedure by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const procedure = await Procedure.findById(id, 'ServiceName ServiceDetail createdAt updatedAt');
        if (!procedure) {
            return res.status(404).json({ message: "Procedure not found" });
        }
        res.json(procedure);
    } catch (error) {
        console.error('Error retrieving procedure:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
