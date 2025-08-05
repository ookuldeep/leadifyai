// Import required modules
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import the leads router
const leadsRouter = require('./routes/leads');

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/leads', leadsRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});