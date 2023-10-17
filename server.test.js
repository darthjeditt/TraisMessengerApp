const request = require('supertest');
const { server, shutdown } = require('./server');
const ioClient = require('socket.io-client');
const { default: mongoose } = require('mongoose');

const SOCKET_SERVER_URL = 'http://localhost:3000';

describe('Server and Socket.io Tests', () => {
    let clientSocket;

    beforeAll((done) => {
        clientSocket = ioClient.connect(SOCKET_SERVER_URL, {
            'reconnection delay': 0,
            'reopen delay': 0,
            'force new connection': true
        });
        clientSocket.on('connect', done);
    });

    afterAll(() => {
        if (clientSocket.connected) {
            clientSocket.disconnect();
        }

        server.close(() => {
            mongoose.connection.close(() => {
                done();
            });
        });
    });

    test('should establish a Socket.io connection', () => {
        expect(clientSocket.connected).toBeTruthy();
    });

    // This test ensures that when a client sends a message, other clients receive it
    test('should broadcast chat messages', (done) => {
        const testMsg = 'Hello World';

        clientSocket.on('chat_message', (message) => {
            expect(message).toBe(testMsg);
            done();
        });

        clientSocket.emit('chat_message', testMsg);
    });

    test('Server should be running on port 3000', async () => {
        const response = await request(server).get('/');
        expect(response.status).toBe(200);
    });
});
