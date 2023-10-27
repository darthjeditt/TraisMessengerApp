const User = require('../models/userMdl');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res, next) => {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
        return res.status(400).json({
            message: 'User with this email already exists!',
        });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        console.log(`User registered: ${newUser.username}`);  // <-- Added log
        res.status(201).json({
            message: 'User registered successfully!',
        });
    } catch (error) {
        next(error);
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log(`User with username: ${username} not found.`);
            return res.status(401).json({ msg: 'Invalid credentials' });
        }
        const isPasswordMatch = bcrypt.compareSync(password, user.password);
        if (!isPasswordMatch) {
            console.log(`Password mismatch for username: ${username}.`);
            return res.status(401).json({ msg: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });
        res.json({ token });
        if (user) {
            console.log(`${username} has just logged in.`)
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getCurrentUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found!',
            });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};
