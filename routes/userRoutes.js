const express = require('express');
const User = require('../models/userMdl');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuthenticated = require('../middleware/authMiddleware');

// Route for signing up
router.post('/signup', userController.registerUser);

// Route for logging in
router.post('/login', userController.loginUser);

// Route to get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, 'username email'); // This will fetch only the username and email fields for all users
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching users');
    }
});

// Route to get current logged in user
router.get('/me', isAuthenticated, userController.getCurrentUser);

// Route to update user's online status
router.put('/:userId/status', isAuthenticated, async (req, res) => {
    try {
        const { userId } = req.params;
        const { online } = req.body; // Assuming you send { online: true/false } in the request body

        const user = await User.findByIdAndUpdate(userId, { online }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Status updated', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
