const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String, // Note: In a real-world scenario, always hash the password
});

const User = mongoose.model('User', UserSchema);
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Sample API endpoint
app.get('/api/data', (req, res) => {
    res.json({ message: "Data from backend!" });
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).send('Username already exists');
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.send('User registered successfully');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

mongoose.connect('mongodb://localhost:27017/chatApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });
