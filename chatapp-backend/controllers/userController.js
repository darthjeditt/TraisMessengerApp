const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Registers a new user.
 * @param {Object} req - The request object containing user details.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.registerUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use.' });
        }

        const newUser = new UserModel(req.body);
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        next(error);
    }
};

/**
 * Authenticates a user and generates a JWT token.
 * @param {Object} req - The request object containing username and password.
 * @param {Object} res - The response object.
 */
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const isPasswordMatch = bcrypt.compareSync(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        user.online = true;
        await user.save();
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });

        res.json({ token });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).send('Internal Server Error.');
    }
};

/**
 * Retrieves the current logged-in user's details.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error.message);
        res.status(500).send('Internal Server Error.');
    }
};
