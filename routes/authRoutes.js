const express = require('express')
const userController = require('../controller/users.controller');
const { LoginUsers } = require('../controller/auth.controller');

const router = express.Router()

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

// authenticate
router.post('/login', LoginUsers)

// protected users



module.exports = router