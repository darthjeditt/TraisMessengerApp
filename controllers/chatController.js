const Message = require('../models/msgMdl');

const messageController = {
    getAllMessages: async (req, res) => {
        try {
            const messages = await Message.find();
            res.json(messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
            res.status(500).send('Something went wrong!');
        }
    },

    postMessage: async (req, res) => {
        const { content, sender } = req.body;
        try {
            const newMessage = new Message({ content, sender });
            await newMessage.save();
            res.send('Message sent successfully');
        } catch (error) {
            console.error('Error posting message:', error);
            res.status(500).send('Something went wrong!');
        }
    },

    getChatHistory: async (req, res) => {
        const { currentUserId, selectedUserId } = req.params;
        try {
            const messages = await Message.find({
                $or: [
                    { sender: currentUserId, receiver: selectedUserId },
                    { sender: selectedUserId, receiver: currentUserId }
                ]
            }).sort('timestamp');
            res.json(messages);
        } catch (err) {
            console.error('Error fetching chat history: ', err);
            res.status(500).send(
                'Something went Wrong with getting chat history.'
            );
        }
    }
};

module.exports = messageController;
