const jwt = require('jsonwebtoken');

const authMiddleWare = (req, res, next) => {
  console.log("headers", req.headers);
  const authHeader = req.headers['authorization']; // Use lowercase 'authorization'

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};

module.exports = authMiddleWare;
