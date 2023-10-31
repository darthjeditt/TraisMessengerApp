const express = require('express');
const router = express.Router();
const { getAllMessages, postMessage, getChatHistory } = require('../controllers/chatController');
const isAuthenticated = require('../middleware/authMiddleware');

// Get all chat messages
router.get('/messages', isAuthenticated, getAllMessages);

// Add a new chat message
router.post('/messages', isAuthenticated, postMessage);

router.get('/history/:currentUserId/:selectedUserId', isAuthenticated, getChatHistory)

module.exports = router;
