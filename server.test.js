const request = require('supertest');
const { app, server, connectToDb, shutdown } = require('./server');
const ioClient = require('socket.io-client');
const mongoose = require('mongoose');
const SOCKET_SERVER_URL = 'http://localhost:3000';

describe('Server and Socket.io Tests', () => {
    beforeAll(async () => {
        await connectToDb();
        server.listen(3000);
    });

    afterAll(async () => {
        await shutdown(); 
    });

    it('should establish a Socket.io connection', (done) => {
        const clientSocket = ioClient.connect(SOCKET_SERVER_URL, {
            'reconnection delay': 0,
            'reopen delay': 0,
            'force new connection': true
        });

        clientSocket.on('connect', () => {
            expect(clientSocket.connected).toBeTruthy();
            clientSocket.disconnect();
            done();
        });
    });

    it('Server should be running on port 3000', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });
});
