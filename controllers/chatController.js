const Message = require('../models/msgMdl');

const messageController = {
    getAllMessages: async (req, res) => {
        try {
            const messages = await Message.find().populate('sender', 'username');
            res.json(messages);
        } catch (error) {
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
            res.status(500).send('Something went wrong!');
        }
    }
};

module.exports = messageController;
