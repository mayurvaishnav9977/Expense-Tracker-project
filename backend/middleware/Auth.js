const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Check if header exists
  if (!authHeader) {
    return res.status(401).json({ message: 'JWT token is required' });
  }

  // Accept both "Bearer <token>" and "<token>" formats
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  if (!token) {
    return res.status(401).json({ message: 'JWT token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTKEY);
    req.user = decoded; // attach decoded payload to req
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired JWT token' });
  }
};

module.exports = ensureAuthenticated;
