const express = require('express')
const QuestionController = require('../controller/question.controller')

const routerQuestion = express.Router()

routerQuestion.get('/', QuestionController.getAllQuestion)
routerQuestion.post('/', QuestionController.createQuestion)
routerQuestion.get('/:id', QuestionController.getQuestionById)
routerQuestion.delete('/:id', QuestionController.deleteQuestion)

module.exports = routerQuestion