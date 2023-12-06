// chatController.js
// This module handles the chat-related operations like fetching and posting messages.

const MessageModel = require('../models/msgModel');
const mongoose = require('mongoose');

/**
 * Fetches all messages from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const fetchAllMessages = async (req, res) => {
    try {
        const messages = await MessageModel.find();
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send('Internal Server Error.');
    }
};

/**
 * Posts a new message to the database and emits it to all connected clients.
 * @param {Object} req - The request object containing message details.
 * @param {Object} res - The response object.
 * @param {Object} io - The socket.io instance for real-time communication.
 */
const sendMessage = async (req, res, io) => {
    const { content, sender, receiver } = req.body;

    try {
        const newMessage = new MessageModel({ content, sender, receiver });
        await newMessage.save();

        io.emit('messageSent', newMessage); // Emit the message to all clients

        res.status(201).json({ message: 'Message sent successfully.' });
    } catch (error) {
        console.error('Error posting message:', error);
        res.status(500).json({ error: 'Failed to send message.' });
    }
};

/**
 * Retrieves the chat history between two users.
 * @param {Object} req - The request object with user IDs.
 * @param {Object} res - The response object.
 */
const fetchChatHistory = async (req, res) => {
    const { currentUserId, selectedUserId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(currentUserId) ||
        !mongoose.Types.ObjectId.isValid(selectedUserId)) {
        return res.status(400).json({
            message: 'Invalid User IDs. Both must be valid ObjectIds.'
        });
    }

    try {
        const messages = await MessageModel.find({
            $or: [
                { sender: currentUserId, receiver: selectedUserId },
                { sender: selectedUserId, receiver: currentUserId }
            ]
        });

        if (!messages.length) {
            return res.status(200).json({ message: 'No chat history found.' });
        }

        res.status(200).json({ data: messages });
    } catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};

module.exports = { fetchAllMessages, sendMessage, fetchChatHistory };
