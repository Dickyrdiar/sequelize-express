const user = require("../models").User
const { bcrypt } = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const users = await user.findOne({ where: { email } });
    if (!users) return res.status(404).json({ message: 'user not found' })

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'invalud password' })

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expresIn: '1h' })
    console.log("token", token)
    res.json({
      message: 'Login success', 
      token, 
      user: {
        email: user.email,
        username: user.username
      }
    })
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ error: error.messahge })
  }
}