const express = require('express');
const router = express.Router();
const { getMessages, addMessage } = require('../controllers/chatController');
const isAuthenticated = require('../middleware/isAuthenticated');

// Get all chat messages
router.get('/messages', isAuthenticated, getMessages);

// Add a new chat message
router.post('/messages', isAuthenticated, addMessage);

module.exports = router;
