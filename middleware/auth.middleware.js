const jwt = require('jsonwebtoken')
const { User } = require('../models')

const JWT_TOKEN = process.env.JWT_TOKEN

exports.authenticateJWT = (req, res) => {
  const token  = req.header('Authorization')?.replace('Bearer', '')

  if (!token) {
    return res.status(403).json({ message: 'no token provide' })
  }

  try {
    const decoded = jwt.verify(token, JWT_TOKEN)
    req.user = decoded;
    next()
  } catch (error) {
    return res.status(401).json({ message: 'invalid or expired token' })
  }
}