const express = require('express');
const User = require('../models/userMdl');
const router = express.Router();
const userController = require('../controllers/userController');
// const isAuthenticated = require('../middleware/authMiddleware');

router.post('/signup', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, 'username email'); // This will fetch only the username and email fields for all users
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching users');
    }
});

router.get('/me', userController.getCurrentUser);

module.exports = router;
