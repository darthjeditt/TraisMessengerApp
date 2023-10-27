const jwt = require('jsonwebtoken');
// const User = require('../models/userMdl');

const isAuthenticated = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ message: 'Authentication token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;  // Set the userId on the request object
        next();
    } catch (error) {
        res.status(401).send({ message: 'Invalid token' });
    }
};

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token'); // Assuming the token is sent in the 'x-auth-token' header

    if (!token) {
        return res.status(401).send('No token, authorization denied');
    }

    try {
        const decoded = jwt.verify(token, 'YOUR_SECRET_KEY'); // Use the same secret key as in the login route
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).send('Token is not valid');
    }
};

module.exports = isAuthenticated;
