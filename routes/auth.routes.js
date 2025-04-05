const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

module.exports = function (pool) {
    // 1. Serve registration page
    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
    });

    // 2. Handle registration
    router.post('/register', async (req, res) => {
        try {
            // 3. Extract user data
            const { fullName, email, password } = req.body;

            // 4. Validate input
            if (!fullName || !email || !password) {
                return res.status(400).json({
                    message: 'All fields are required'
                });
            }

            // 5. Check for existing user
            const [existingUsers] = await pool.promise().execute(
                'SELECT email FROM users WHERE email = ?',
                [email]
            );

            // 6. Return error if user exists
            if (existingUsers.length > 0) {
                return res.status(400).json({
                    message: 'Email already registered'
                });
            }

            // 7. Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // 8. Save new user
            await pool.promise().execute(
                'INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)',
                [fullName, email, hashedPassword]
            );

            // 9. Send success response
            res.status(201).json({
                message: 'User registered successfully'
            });

        } catch (error) {
            // 10. Handle errors
            console.error('Registration error:', error);
            res.status(500).json({
                message: 'Server error'
            });
        }
    });

    // Login route
    router.post('/login', async (req, res) => {
        try {
            // 1. Extract login credentials
            const { email, password } = req.body;

            // 2. Validate input
            if (!email || !password) {
                return res.status(400).json({
                    message: 'Email and password are required'
                });
            }

            // 3. Check if user exists
            const [users] = await pool.promise().execute(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );

            // 4. If user not found
            if (users.length === 0) {
                return res.status(401).json({
                    message: 'Invalid email or password'
                });
            }

            const user = users[0];

            // 5. Compare passwords
            const isValidPassword = await bcrypt.compare(password, user.password);

            // 6. If password doesn't match
            if (!isValidPassword) {
                return res.status(401).json({
                    message: 'Invalid email or password'
                });
            }

            // 7. Send success response
            res.status(200).json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email
                }
            });

        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                message: 'Server error'
            });
        }
    });

    // Routes go here
    return router;
}