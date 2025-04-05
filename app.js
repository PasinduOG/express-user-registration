const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 5000;

// MySQL Connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'PasinduDev678',
    database: 'user_registration',
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
    console.log('Connected Successfully to database');
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

