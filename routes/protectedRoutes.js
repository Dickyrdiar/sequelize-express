const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({ message: 'This is protected route', user: req.user })
})

module.exports = router