const express = require('express')
const { newQuestion, getAllQuestion, getQuestionById, deleteQuestion } = require('../controller/question.controller')

const routerQuestion = express.Router()

routerQuestion.get('/', getAllQuestion)
routerQuestion.post('/', newQuestion)
routerQuestion.get('/:id', getQuestionById)
routerQuestion.delete('/:id', deleteQuestion)

module.exports = routerQuestion