// server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Create a MySQL connection pool using the connection URL from .env
const pool = mysql.createPool(process.env.DATABASE_URL);

// Endpoint to save user personalities
app.post('/api/savePersonalities', async (req, res) => {
    const { code, personalities } = req.body;

    if (!code || !personalities) {
        return res.status(400).json({ message: 'Code and personalities are required.' });
    }

    try {
        // Insert data into the database
        const sql = `
            INSERT INTO user_personalities (code, personalities)
            VALUES (?, ?)
        `;
        await pool.execute(sql, [code, JSON.stringify(personalities)]);

        res.status(200).json({ message: 'Personalities saved successfully!' });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Failed to save personalities.' });
    }
});

// Start the server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
