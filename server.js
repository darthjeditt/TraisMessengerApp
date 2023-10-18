const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res) => {
    res.status(200).send('Server is running');
});

app.post('/test/user/create', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/test/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send(err);
    }
})

io.on('connection', (socket) => {
    console.log('New User Connected');

    socket.on('chat_message', (message) => {
        io.emit('chat_message', message);
    });

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
    return new Promise((resolve, reject) => {
        server.close(() => {
            mongoose.connection.close().then(() => {
                resolve();
            }).catch(err => {
                reject(err);
            });
        });
    });
}


module.exports = { app, server, connectToDb, shutdown};
