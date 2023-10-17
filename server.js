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

function connectToDb() {
    return mongoose.connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

async function shutdown() {
    return new Promise((resolve) => {
        server.close(() => {
            console.log('HTTP server closed.');
            mongoose.connection.close().then(() => {
                console.log('MongoDB connection closed');
                resolve();
            });
        });
    });
}

module.exports = { app, server, shutdown, connectToDb };
