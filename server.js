const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Helper function for using async/await with SQL queries
function query(sql, params) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Register new users
app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUsers = await query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login users
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const users = await query('SELECT * FROM users WHERE username = ?', [username]);
        if (users.length === 0) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, username: user.username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/savePersonalities', async (req, res) => {
    const { username, personalities } = req.body;
    try {
        // Check if user exists to respect the foreign key constraint
        const userExists = await query('SELECT * FROM users WHERE username = ?', [username]);
        if (userExists.length === 0) {
            return res.status(404).json({ message: "User does not exist" });
        }

        // Insert each personality
        for (const personality of personalities) {
            await query('INSERT INTO user_personalities (username, personality_name, personality_vector) VALUES (?, ?, ?)', 
                [username, personality.name, JSON.stringify(personality.values)]);
        }
        res.status(201).json({ message: "Personalities saved successfully" });
    } catch (err) {
        console.error("Error saving personalities:", err);
        res.status(500).json({ error: "Failed to save personalities, error: " + err.message });
    }
});



// Optional: Protect routes
app.get('/api/protected', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        res.json({ message: "Access granted" });
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
