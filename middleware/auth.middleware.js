const jwt = require('jsonwebtoken')
require('dotenv').config()

const authMiddleWare = (req, res, next) => {
  const token = req.cookie.token;
  console.log('token', token)

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id;
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid Token' })
  }
}

module.exports = authMiddleWare