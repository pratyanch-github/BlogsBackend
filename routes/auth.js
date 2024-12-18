// const express = require('express');
import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../schemas/userSchema.js';
import auth from '../middlewares/auth.js';
import authMiddleware from '../middlewares/auth.js';
// import 'dotenv/config'

const router = express.Router();
// Register Route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Check if user exists
        let user = await User.findOne({ email });
        let userWithName = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        if (userWithName) {
            return res.status(400).json({ message: "This username is already taken, Try another." })
        }

        // Create new user
        user = new User({
            username: username,
            email: email,
            password: password,
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user
        await user.save();

        // Create JWT payload
        const payload = {
            user: {
                id: user.id
            }
        };

        // Generate token
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(400).json({ message: 'Generation Successful', token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ 'Server error': 'error', err: err.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT payload
        const payload = {
            user: {
                id: user.id
            }
        };

        // Generate token
        let token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
        );
        res.status(400).json({ message: 'Generation Successful', token: token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Protected Route Example
router.get('/me', auth, async (req, res) => {
    try {

        let token = req.header('Authorization').replace('Brearer', '');
        let decodec = jwt.verify(token, process.env.JWT_SECRET);
        let userid = decodec.user.id;
        const user = await User.findById(userid).select('-password');
        // const user = await User.findById(userid).select('-password');
        res.json({ message: 'Yes its you : ' + user.username, });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/details', authMiddleware, async (req, res) => {

    let token = req.header('Authorization').replace('Brearer', '');
    let decodec = jwt.verify(token, process.env.JWT_SECRET);
    let userid = decodec.user.id;
    const user = await User.findById(userid).select('-password').select('-_id');

    res.status(400).json({ message: 'Successvully found user details', user });
})

export default router;