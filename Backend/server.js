const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Use middleware
app.use(cors());
app.use(bodyParser.json());

// Set the port
const PORT = process.env.PORT || 8070; // Use a different port for Express server

// MongoDB connection URL from environment variables
const URL = process.env.MONGODB_URI;


// Connect to MongoDB using Mongoose
mongoose.connect(URL)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));


// Start the server
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});



// Import the routes
const housesRoute = require('./routes/houses');
const fieldVisitRoutes = require('./routes/filedvisit');
const electionRoutes = require('./routes/electionRoutes');
const procedureRoutes = require('./routes/procedureRoutes');


// Use the api routes
app.use('/api', housesRoute);
app.use('/field', fieldVisitRoutes);
app.use('/election', electionRoutes);
app.use('/procedures',procedureRoutes);