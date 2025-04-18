const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// MySQL Connection
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test MySQL Connection
pool.getConnection((err, connection) => {
    if (err) {
        console.log('Error connecting to database:', err);
        return;
    }
    console.log('MySQL Connected');
    connection.release();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
const userRoutes = require('./routes/auth.routes')(pool);
app.use('/', userRoutes);

app.listen(port, () => {
    console.log(`Server running: http://localhost:${port}`);
});

