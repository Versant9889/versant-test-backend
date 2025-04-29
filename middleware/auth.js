const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Received token:', token); // Debug token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Debug decoded token
    req.user = decoded;
    next();
  } catch (err) {
    console.log('Token verification error:', err.message); // Debug error
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;