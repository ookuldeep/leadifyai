// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const leadRoutes = require("./routes/leads");
app.use("/api/leads", leadRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to LeadifyAI Backend 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
