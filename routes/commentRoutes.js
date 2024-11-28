const express = require('express')
const commentController = require('../controller/comment.controller')
const routerComment = express.Router()

routerComment.post('/:questionId', commentController.createComment)
routerComment.get('/', commentController.getAllComment)
routerComment.delete('/:id', commentController.deletedComment)

module.exports = routerComment