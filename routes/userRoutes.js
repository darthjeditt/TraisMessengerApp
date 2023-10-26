const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userMdl');
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.isValidPassword(password))) {
            return res
                .status(401)
                .send({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ _id: user._id }, 'YOUR_SECRET_KEY', {
            expiresIn: '1h'
        });
        res.send({ token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, 'username email'); // This will fetch only the username and email fields for all users
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching users');
    }
});

module.exports = router;
