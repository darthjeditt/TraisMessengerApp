const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const isAuthenticated = require('./middleware/authMiddleware');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('send_message', (message) => {
        io.emit('receive_message', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// This endpoint is for testing the connection to the backend
app.get('/api/data', (req, res) => {
    res.json({ message: 'Data from backend!' });
});

// Use the user routes for signup, login, etc.
app.use('/api/user', userRoutes);

// Ensure that the user is authenticated before they can access the chat routes
app.use('/api/chat', isAuthenticated, chatRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const connectToDbAndStartServer = async () => {
    if (mongoose.connection.readyState === 0) {
        // Check if mongoose is not connected
        await mongoose.connect('mongodb://localhost:27017/chatAppDB', { // Changed the database name to 'chatAppDB'
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true // This is to ensure that we can use unique constraints in our schemas
        });
    }
};

connectToDbAndStartServer();

module.exports = { app, server };
