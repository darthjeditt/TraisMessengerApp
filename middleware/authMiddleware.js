const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
// const User = require('../models/userMdl');

dotenv.config();

const isAuthenticated = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).send({ error: 'Authentication required.' });
        }

        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_TOKEN); // Replace 'YOUR_SECRET_KEY' with your actual secret key

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Authentication failed.' });
    }
};

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token'); // Assuming the token is sent in the 'x-auth-token' header

    if (!token) {
        return res.status(401).send('No token, authorization denied');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN); // Use the same secret key as in the login route
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).send('Token is not valid');
    }
};

module.exports = isAuthenticated;
