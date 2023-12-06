const express = require('express');
const chatController = require('../controllers/chatController');
const isAuthenticated = require('../middleware/authMiddleware');

module.exports = function (io) {
    const router = express.Router();

    /**
     * Route to get all chat messages.
     * Authentication middleware is used to ensure that the user is logged in.
     */
    router.get('/messages', isAuthenticated, chatController.getAllMessages);

    /**
     * Route to add a new chat message.
     * Includes the socket.io instance for real-time communication.
     */
    router.post('/messages', isAuthenticated, (req, res) => {
        chatController.postMessage(req, res, io);
    });

    /**
     * Route to get the chat history between two users.
     * URL parameters are used to specify the current user and the selected user.
     */
    router.get('/history/:currentUserId/:selectedUserId', isAuthenticated, chatController.getChatHistory);

    return router;
};
