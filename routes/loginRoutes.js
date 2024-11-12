const express = require('express')
const { login, logout } = require('../controller/auth.controller')

const routerLogin = express.Router()

routerLogin.post('/login', login)
routerLogin.post('/logout', logout)

module.exports = routerLogin