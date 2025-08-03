const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample Route
app.get("/", (req, res) => {
  res.send("Welcome to LeadifyAI Backend 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// After app.use(cors()) and app.use(express.json())
const leadRoutes = require("./routes/leads");
app.use("/api/leads", leadRoutes);

// backend/server.js

app.post('/api/leads', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([{ name, email, message }]);

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: 'Database insert failed' });
    }

    res.status(200).json({ message: 'Lead submitted successfully', data });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
