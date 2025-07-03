const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../utils/statusCodes');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(UNAUTHORIZED).json({ message: 'No token provided' });
    }

    // Expecting format: "Bearer <token>"
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(UNAUTHORIZED).json({ message: 'Invalid token format' });
    }
    
    const token = parts[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(UNAUTHORIZED).json({ message: 'Failed to authenticate token' });
        }

        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;