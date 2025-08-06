// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
require('node-fetch'); // if you're using it


const app = express(); // ✅ Define app FIRST
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const leadRoutes = require('./routes/leads');
app.use('/api/leads', leadRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("✅ Welcome to LeadifyAI Backend");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
