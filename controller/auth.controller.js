const bycript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

const JWT_TOKEN = process.env.JWT_TOKEN

exports.LoginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    const isMatch = await bycript.compare(password, user.password)
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid email or password' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      JWT_TOKEN,
      { expiresIn: '1h' }
    )

    res.json({
      message: 'Login successfull',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}