const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const cors = require('cors');
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Aniket@123',
    database: 'aniket_db'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
        throw err;
    }
    console.log("Connected to the database");
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/signup', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.error("MySQL Error: ", err);  // <-- Add this line
            return res.status(500).json({ error: 'Failed to insert user' });
        }        
        res.json({ message: 'User created', id: result.insertId });
    });
});


app.listen(5000, (err) => {
    console.log("Running on port 5000");
});


  

  