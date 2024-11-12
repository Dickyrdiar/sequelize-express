const express = require('express')
const loginController = require('../controller/auth.controller')

const routerLogin = express.Router()

routerLogin.post('/', loginController.login)

module.exports = routerLogin