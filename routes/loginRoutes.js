const express = require('express')
const { login, logout, TokenRefresh } = require('../controller/auth.controller')

const routerLogin = express.Router()

routerLogin.post('/login', login)
routerLogin.post('/logout', logout)
routerLogin.post('/token-refresh', TokenRefresh)

module.exports = routerLogin