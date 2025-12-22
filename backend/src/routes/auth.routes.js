const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const generateToken = require('../middlewares/auth.middleware');

dotenv.config();

router.post('/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', token: generateToken(newUser._id) });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/auth/login', async (req, res) => { // pending - have to add jwt token in cookies
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;