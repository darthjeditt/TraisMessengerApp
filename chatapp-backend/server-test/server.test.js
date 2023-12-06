const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../server');

describe('Server API Endpoints', () => {
    // Connect to the database before running tests
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Login to get a token
        const loginResponse = await request(app).post('/api/users/login').send({
            username: 'yourTestUsername',
            password: 'yourTestPassword'
        });
        token = loginResponse.body.token;
    });

    // Cleanup and disconnect from the database after tests
    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        server.close();
    });

    // Sample API endpoint test
    it('should fetch data from /api/data endpoint', async () => {
        const res = await request(app).get('/api/data');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Data from backend!');
    });

    // User registration test
    it('should register a new user', async () => {
        const newUser = {
            username: 'testUser',
            email: 'test@example.com',
            password: 'password123'
        };
        const res = await request(app).post('/api/users/signup').send(newUser);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty(
            'message',
            'User registered successfully.'
        );
    });

    // User login test
    it('should authenticate a user and return a token', async () => {
        const userCredentials = {
            username: 'testUser',
            password: 'password123'
        };
        const res = await request(app)
            .post('/api/users/login')
            .send(userCredentials);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    // Fetching all users test
    it('should fetch all users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Test for getting chat history
    it('should fetch chat history for two users', async () => {
        const userId1 = 'someUserId1';
        const userId2 = 'someUserId2';
        const res = await request(app)
            .get(`/api/chat/history/${userId1}/${userId2}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Test for posting a new message in chat
    it('should post a new message', async () => {
        const newMessage = {
            content: 'Hello',
            sender: 'userId1',
            receiver: 'userId2'
        };
        const res = await request(app)
            .post('/api/chat/messages')
            .send(newMessage)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Message sent successfully');
    });

    // Test error handling for an invalid route
    it('should handle invalid routes', async () => {
        const res = await request(app).get('/api/unknown');
        expect(res.statusCode).toEqual(404); // Assuming you have a 404 handler
    });
});
