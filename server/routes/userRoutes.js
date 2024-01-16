const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Create a new user with the plain password
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Login User
router.post('/login', async (req, res) => {
    try {
        console.log("Login attempt received. Body:", req.body); // Log the request body

        const { email, password } = req.body; // Now using email for login
        console.log(`Attempting to find user with email: ${email}`); // Log the email being searched

        const user = await User.findOne({ email });

        if (!user) {
            console.log(`No user found with email: ${email}`); // Log if no user is found
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log(`User found. Attempting to compare password for user with email: ${email}`); // Log that user is found

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password comparison failed."); // Log if password comparison fails
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log("Password comparison successful."); // Log if password comparison is successful

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(`Token generated for user with email: ${email}`); // Log token generation

        res.json({ token });
    } catch (error) {
        console.error("Error during login process:", error); // Log any errors
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
