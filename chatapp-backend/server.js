const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');

const isAuthenticated = require('./middleware/authMiddleware');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('dev'));

const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
});

app.get('/api/data', (req, res) => {
    res.json({ message: 'Data from backend!' });
});

app.use('/api/users', userRoutes);
app.use('/api/chat', isAuthenticated, chatRoutes(io));

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

async function connectToDbAndStartServer() {
    try {
        await mongoose.connect('mongodb://localhost:27017/database', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    }
}

connectToDbAndStartServer();

module.exports = { app, server };
