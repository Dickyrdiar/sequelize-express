const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Use lowercase 'authorization'

  // Check if the authorization header is provided
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided' });
  }

  // Extract the token from the "Bearer <token>" format
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token is missing' });
  }

  try {
    // Verify the token using the JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID from the token payload to the request object
    req.user = { id: decoded.userId }; // Ensure `userId` matches your token payload structure

    // Proceed to the next middleware or controller
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};

module.exports = authMiddleware;
