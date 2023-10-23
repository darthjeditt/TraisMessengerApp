const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('./server');

describe('Server API Endpoints', () => {
    // Connect to the database before running tests
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    // Cleanup and disconnect from the database after tests
    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        const dbState = mongoose.connection.readyState;
        expect(dbState).toBe(0); // 0 indicates disconnected
        server.close(); // Close the server after all tests
    });

    // Test the sample API endpoint
    it('should fetch data from /api/data endpoint', async () => {
        const res = await request(app).get('/api/data');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Data from backend!');
    });
    // Test if the server is running on the correct port
    it('should run on the correct port', () => {
        const actualPort = server.address().port;
        const expectedPort = process.env.PORT || 3000;
        expect(actualPort).toEqual(expectedPort);
    });

    // Test if the server can connect to MongoDB
    it('should connect to MongoDB', async () => {
        const dbState = mongoose.connection.readyState;
        expect(dbState).toBe(1); // 1 indicates connected
    });
    // Test user registration
    // it('should register a new user', async () => {
    //     const res = await request(app)
    //         .post('/register')
    //         .send({
    //             username: 'testUser',
    //             password: 'testPassword'
    //         });
    //     expect(res.statusCode).toEqual(200);
    //     expect(res.text).toBe('User registered successfully');
    // });

    // Test duplicate user registration
    // it('should not register a duplicate user', async () => {
    //     await request(app)
    //         .post('/register')
    //         .send({
    //             username: 'testUser',
    //             password: 'testPassword'
    //         });
    //     const res = await request(app)
    //         .post('/register')
    //         .send({
    //             username: 'testUser',
    //             password: 'testPassword'
    //         });
    //     expect(res.statusCode).toEqual(400);
    //     expect(res.text).toBe('Username already exists');
    // });

    // Add more tests as needed...
});
