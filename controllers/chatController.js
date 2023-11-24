const Message = require('../models/msgMdl');
const mongoose = require('mongoose');
const User = require('../models/userMdl');

const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send('Something went wrong!');
    }
};

const postMessage = async (req, res, io) => {
    const { content, sender, receiver } = req.body;
    try {
        const newMessage = new Message({ content, sender, receiver });
        await newMessage.save();

        // Emit the message to all connected clients
        io.emit('newMessage', newMessage);

        return res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error posting message:', error);
        return res.status(500).json({ error: 'Failed to send message' });
    }
};


const getChatHistory = async (req, res) => {
    const { currentUserId, selectedUserId } = req.params;

    // Check if both user IDs are provided
    if (
        !mongoose.Types.ObjectId.isValid(currentUserId) ||
        !mongoose.Types.ObjectId.isValid(selectedUserId)
    ) {
        return res.status(400).json({
            success: false,
            message:
                'Both currentUserId and selectedUserId must be valid ObjectIds.'
        });
    }

    try {
        // Fetch messages between the two users
        const messages = await Message.find({
            $or: [
                { sender: currentUserId, receiver: selectedUserId },
                { sender: selectedUserId, receiver: currentUserId }
            ]
        });

        // If no messages are found, return a message indicating so
        if (!messages.length) {
            return res.status(404).json({
                success: false,
                message: 'No chat history found between the two users.'
            });
        }

        // If messages are found, return them
        return res.status(200).json({
            success: true,
            data: messages
        });
    } catch (error) {
        console.error('Error fetching chat history: ', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error. Unable to fetch chat history.'
        });
    }
};

module.exports = {
    getAllMessages,
    postMessage,
    getChatHistory
};
