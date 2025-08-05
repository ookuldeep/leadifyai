const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // Import node-fetch
const { Pool } = require('pg'); // Assuming you're using pg for your database

// Database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// A simple endpoint to test the leads submission
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    // A simple validation
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }

    try {
        // Example of using node-fetch to send data to another API (optional)
        // const response = await fetch('https://example.com/api/send', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ name, email }),
        // });
        // const data = await response.json();
        // console.log('Response from external API:', data);
        
        // Example of saving data to a PostgreSQL database
        const result = await pool.query(
            'INSERT INTO leads (name, email, message) VALUES ($1, $2, $3) RETURNING *',
            [name, email, message]
        );

        res.status(201).json({ 
            message: 'Lead submitted successfully!',
            lead: result.rows[0]
        });

    } catch (error) {
        console.error('Error submitting lead:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;