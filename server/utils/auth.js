const jwt = require('jsonwebtoken');

const signToken = (userData) => {
    const payload = {
        userId: userData._id,
        // Add any other user data you want to include in the token
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { signToken };
