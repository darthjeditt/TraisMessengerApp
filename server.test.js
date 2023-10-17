const request = require('supertest');
const { server, shutdown } = require('./server');
const ioClient = require('socket.io-client');
const { mongoose, mongo } = require('mongoose');

const SOCKET_SERVER_URL = 'http://localhost:3000';
const PORT = 3000;

let clientSocket;

describe('Server and Socket.io Tests', () => {
    beforeAll((done) => {
        server.listen(PORT, () => {
            clientSocket = ioClient.connect(SOCKET_SERVER_URL, {
                'reconnection delay': 0,
                'reopen delay': 0,
                'force new connection': true
            });
            clientSocket.on('connect', done);
        });
    });

    afterAll(async () => {
        if (clientSocket && clientSocket.connected) {
            clientSocket.disconnect();
        }
        await shutdown();
    }, 10000);

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
