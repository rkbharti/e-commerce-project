const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const bcrypt = require('bcryptjs'); // MUST be imported

// Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body; // Extract 'name' here

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ 
            name, // Save 'name' to DB
            email, 
            password: hashedPassword 
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Server error during signup" });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Send 'name' back to frontend
        res.status(200).json({ 
            message: "Login successful", 
            user: { 
                id: user._id, 
                email: user.email, 
                name: user.name // Ensure 'name' is sent back
            } 
        });
    } catch (err) {
        res.status(500).json({ error: "Server error during login" });
    }
});

module.exports = router;