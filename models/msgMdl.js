const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
