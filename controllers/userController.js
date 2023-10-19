// userController.js

const User = require('../models/user'); // Assuming you have a User model
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For token generation

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create a new user
        user = new User({
            username,
            password: bcrypt.hashSync(password, 10) // Hash the password
        });

        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
