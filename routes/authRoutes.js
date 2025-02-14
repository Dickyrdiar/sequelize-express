const express = require('express')
const userController = require('../controller/users.controller');

const router = express.Router()

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
// authenticate
// router.post('/login', loginController.login)


module.exports = router