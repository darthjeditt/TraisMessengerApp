const mongoose = require('mongoose');

/**
 * Schema for the Message model.
 * Represents a message with content, sender, receiver, and timestamp.
 */
const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Message content is required']
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Sender is required']
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Receiver is required']
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
