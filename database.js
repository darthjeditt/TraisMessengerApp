const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Message Schema
const messageSchema = new mongoose.Schema({
    sender: String,
    content: String,
    timestamp: Date
});

const Message = mongoose.model('Message', messageSchema);

module.exports = { User, Message };
