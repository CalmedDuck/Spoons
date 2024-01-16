// In your login route
const { signToken } = require('./path/to/auth');
// ...
const token = signToken(user);
res.json({ token });

// In a protected route
const { authenticateToken } = require('./path/to/authMiddleware');
// ...
router.get('/protected-route', authenticateToken, (req, res) => {
    // Route logic
});
