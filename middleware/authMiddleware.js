const jwt = require('jsonwebtoken');
const User = require('../models/userMdl');

const isAuthenticated = async (req, res, next) => {
    try {
        // Check if the authorization header exists
        if (!req.headers.authorization) {
            throw new Error('Authorization header missing');
        }

        const token = req.headers.authorization.replace('Bearer ', '');

        // Use an environment variable for the JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
        
        const user = await User.findById(decoded._id);
        
        if (!user) {
            throw new Error('User not found');
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error.message); // Log the error for debugging
        res.status(401).send({ error: 'Please authenticate' });
    }
};

module.exports = isAuthenticated;
