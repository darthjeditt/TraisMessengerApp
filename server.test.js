const request = require('supertest');
const app = require('./server'); // your server.js file

describe('POST /register', () => {
    it('should register a user', async () => {
        const response = await request(app)
            .post('/register')
            .send({
                username: 'testUser',
                password: 'testPassword'
            });
        expect(response.status).toBe(200);
    });
});
