const request = require('supertest');
const { app, server, connectToDb, shutdown } = require('./server');
const User = require('./models/user');
const { default: mongoose } = require('mongoose');

describe('User CRUD tests', () => {
    beforeAll(async () => {
        await connectToDb();
    });

    afterAll(async () => {
        await shutdown();
    });

    it('should create a new user', async () => {
        const response = await request(app).post('/test/user/create').send({
            username: 'testUser',
            password: 'testPassword'
        });

        expect(response.status).toBe(200);
    });

    it('should fetch a user by ID', async () => {
        const user = new User({
            username: 'fetchUser',
            password: 'testPassword'
        });
        await user.save();

        const response = await request(app).get(`/test/user/${user._id}`);
        expect(response.status).toBe(200);
        expect(response.body.username).toBe('fetchUser');
    });
});
