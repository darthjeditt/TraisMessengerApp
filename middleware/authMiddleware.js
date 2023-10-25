const jwt = require('jsonwebtoken');
const User = require('../models/userMdl');

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decoded = jwt.verify(token, 'YOUR_SECRET_KEY');
        const user = await User.findById(decoded._id);
        if (!user) {
            throw new Error();
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' });
    }
};

module.exports = isAuthenticated;
