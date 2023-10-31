const express = require('express');
const router = express.Router();
const { getAllMessages, postMessage, getChatHistory } = require('../controllers/chatController');
const isAuthenticated = require('../middleware/authMiddleware');

// Get all chat messages
router.get('chat/messages', isAuthenticated, getAllMessages);

// Add a new chat message
router.post('chat/messages', isAuthenticated, postMessage);

router.get('/chat/history/:currentUserId/:selectedUserId', isAuthenticated, getChatHistory)

module.exports = router;
