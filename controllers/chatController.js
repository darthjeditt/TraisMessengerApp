const Message = require('../models/msgMdl');
const User = require('../models/userMdl')

const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send('Something went wrong!');
    }
};

const postMessage = async (req, res) => {
    const { content, sender } = req.body;
    try {
        const newMessage = new Message({ content, sender });
        await newMessage.save();
        return res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error posting message:', error);
        return res.status(500).json({ error: 'Failed to send message' });
    }
};

const getChatHistory = async (req, res) => {
    try {
        // Fetch the user based on the username
        const user = await User.findOne({ username: req.body.username });

        console.log(`this is the user: ${user}`)
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Now use the user's ObjectId to fetch the chat history
        const messages = await Message.find({
            $or: [
                { sender: user._id, receiver: req.params.selectedUserId },
                { receiver: user._id, sender: req.params.selectedUserId }
            ]
        });

        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllMessages,
    postMessage,
    getChatHistory
};
