const express = require('express');
const router = express.Router();
const {
    getAllMessages,
    postMessage,
    getChatHistory
} = require('../controllers/chatController');
const isAuthenticated = require('../middleware/authMiddleware');

module.exports = function (io) {
    // Get all chat messages
    router.get('/messages', isAuthenticated, getAllMessages);

    // Add a new chat message
    router.post('/messages', isAuthenticated, (req, res) => postMessage(req, res, io));

    router.get(
        '/history/:currentUserId/:selectedUserId',
        isAuthenticated,
        getChatHistory
    );

    return router;
};
