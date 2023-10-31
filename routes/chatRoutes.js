const express = require('express');
const router = express.Router();
const { getAllMessages, postMessage } = require('../controllers/chatController');
const isAuthenticated = require('../middleware/authMiddleware');

// Get all chat messages
router.get('chat/messages', isAuthenticated, getAllMessages);

// Add a new chat message
router.post('chat/messages', isAuthenticated, postMessage);

module.exports = router;
