const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Middleware to authenticate a user using a JWT token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const isAuthenticated = (req, res, next) => {
    const authHeader = req.header('Authorization') || req.header('x-auth-token');

    if (!authHeader) {
        return res.status(401).send({ message: 'No authentication token, access denied.' });
    }

    try {
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ message: 'Invalid token, access denied.' });
    }
};

module.exports = isAuthenticated;
