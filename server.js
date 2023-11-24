const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');

const isAuthenticated = require('./middleware/authMiddleware');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes')(io);

app.use(bodyParser.json());
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
);
app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {
    console.log(`${socket.id} connected`);

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
    });
});

app.get('/api/data', (req, res) => {
    res.json({ message: 'Data from backend!' });
});

app.use('/api/user', userRoutes);
app.use('/api/chat', isAuthenticated, chatRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const connectToDbAndStartServer = async () => {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect('mongodb://localhost:27017/test', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        }
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

connectToDbAndStartServer();

module.exports = { app, server };
