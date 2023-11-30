const User = require('../models/userMdl');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.registerUser = async (req, res, next) => {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
        return res.status(400).json({
            message: 'User with this email already exists!'
        });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        await newUser.save();
        console.log(`User registered: ${newUser.username}`); // <-- Added log
        res.status(201).json({
            message: 'User registered successfully!'
        });
    } catch (error) {
        next(error);
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        console.log(`does ${password} |equal| ${user.password}`)
        if (!user) {
            console.log(`User with username: ${username} not found.`);
            return res.status(401).json({ msg: 'Invalid credentials' });
        }
        const isPasswordMatch = bcrypt.compareSync(password, user.password);
        if (!isPasswordMatch) {
            console.log(`Password mismatch for username: ${username}.`);
            return res.status(401).json({ msg: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });
        console.log('Backend Generated Token:', token);

        res.json({ token });

        if (user) {
            console.log(`${username} has just logged in.`);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            console.error('User not found in the database');
            return res.status(404).send({
                message: 'User not found!'
            });
        }
        res.send(user);
    } catch (error) {
        console.error('User not found in the database', error);
        return res.status(500).send({
            message: 'Internal Server Error'
        });
    }
};

