const user = require("../models").User
const { compare } = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const users = await user.findOne({ where: { email } });
    if (!users) return res.status(404).json({ message: 'user not found' })

    const isPasswordValid = await compare(password, users.password)
    if (isPasswordValid) return res.status(401).json({ message: 'invalid password' })

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.cookie('token', token, { httpOnly: true })
    res.status(200).json({
      message: 'Login success', 
      token, 
      user: {
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName
      }
    })
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ error: error.messahge })
  }
}

exports.logout =  (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logged out' })
}