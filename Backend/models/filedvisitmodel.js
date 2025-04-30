const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the FieldVisit schema
const FieldVisitSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create and export the model
const FieldVisit = mongoose.model('Filedvisit', FieldVisitSchema);
module.exports = FieldVisit;
