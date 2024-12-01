const express = require('express')
const commentController = require('../controller/comment.controller')
const authMiddleware = require('../middleware/auth.middleware')
const routerComment = express.Router()

routerComment.post('/', authMiddleware, commentController.createComment)
routerComment.get('/', commentController.getAllComment)
routerComment.delete('/:id', commentController.deletedComment)

module.exports = routerComment