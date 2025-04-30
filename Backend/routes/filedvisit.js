const express = require('express');
const FieldVisit = require('../models/filedvisitmodel'); // FieldVisit model
const router = express.Router();

// Add a new field visit
router.post('/add', async (req, res) => {
  try {
    console.log('Received data for adding field visit:', req.body); // Log data received
    const { date, location, purpose, notes } = req.body;
    const newVisit = new FieldVisit({
      date,
      location,
      purpose,
      notes,
    });
    await newVisit.save();
    res.status(201).json({ message: 'Field visit added successfully', newVisit });
  } catch (error) {
    console.error('Error adding field visit:', error); // Log error
    res.status(400).json({ message: 'Error adding field visit', error });
  }
});

// Get all field visits
router.get('/get', async (req, res) => {
  try {
    const visits = await FieldVisit.find();
    console.log('Fetched field visits:', visits); // Log fetched visits
    res.status(200).json(visits);
  } catch (error) {
    console.error('Error fetching field visits:', error); // Log error
    res.status(400).json({ message: 'Error fetching field visits', error });
  }
});

// Update a field visit
router.put('/update/:id', async (req, res) => {
  try {
    console.log('Received data for updating field visit:', req.body); // Log data received
    const updatedVisit = await FieldVisit.findByIdAndUpdate(
      req.params.id,
      req.body, // Update fields provided in the request body
      { new: true } // Return the updated document
    );
    if (!updatedVisit) {
      return res.status(404).json({ message: 'Field visit not found' });
    }
    res.status(200).json({ message: 'Field visit updated successfully', updatedVisit });
  } catch (error) {
    console.error('Error updating field visit:', error); // Log error
    res.status(400).json({ message: 'Error updating field visit', error });
  }
});

// Delete a field visit
router.delete('/delete/:id', async (req, res) => {
  try {
    console.log('Received request to delete field visit with ID:', req.params.id); // Log ID received
    const deletedVisit = await FieldVisit.findByIdAndDelete(req.params.id);
    if (!deletedVisit) {
      return res.status(404).json({ message: 'Field visit not found' });
    }
    res.status(200).json({ message: 'Field visit deleted successfully' });
  } catch (error) {
    console.error('Error deleting field visit:', error); // Log error
    res.status(400).json({ message: 'Error deleting field visit', error });
  }
});

module.exports = router;
