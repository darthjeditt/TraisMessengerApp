const express = require('express');
const UserModel = require('../models/userModel');
const userController = require('../controllers/userController');
const isAuthenticated = require('../middleware/authMiddleware');

const router = express.Router();

// Route for user signup
router.post('/signup', userController.registerUser);

// Route for user login
router.post('/login', userController.loginUser);

// Route to fetch all users (only username and email fields)
router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find({}, 'username email');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Route to fetch the current logged-in user
router.get('/me', isAuthenticated, userController.getCurrentUser);

// Route to update a user's online status
router.put('/:userId/status', isAuthenticated, async (req, res) => {
    try {
        const { userId } = req.params;
        const { online } = req.body;

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { online },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Status updated', user: updatedUser });
    } catch (error) {
        console.error('Error updating user status:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
