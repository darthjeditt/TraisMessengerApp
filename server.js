const express = require('express');
const http = require('http');
const { default: mongoose } = require('mongoose');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000;

app.get('/', (req, res) => {
    res.status(200).send('Server is running');
});

mongoose
    .connect('mongodb://localhost:27017/', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Serve static files if needed (e.g., frontend files)
// Uncomment below if you have a 'public' directory with static frontend files.
// app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New User Connected');

    socket.on('chat_message', (message) => {
        // Broadcast the chat message to all other clients
        io.emit('chat_message', message);
    });

    // Event for when a user disconnects
    socket.on('disconnect', () => {
        console.log('User has disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function shutdown() {
    server.close(() => {
        console.log('HTTP server closed.');
        mongoose.connection.close();
        console.log('MongoDB connection closed');
    });
}

module.exports = { server, shutdown };
