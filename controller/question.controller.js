const { Question } = require('../models')

exports.createQuestion = async (req, res) => {
  try {
    const newQuestion = await Question.create(req.body)
    res.status(201).json(newQuestion)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.getAllQuestion = async (req, res) => {
  try {
    const questions = await Question.findAll()
    res.json(questions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getQuestionById = async (req, res) => {
  try {
    const foundQuestion = await Question.findByPk(req.params.id)
    if (!foundQuestion) return res.status(400).json({ error: "User not Found" })

    res.json(foundQuestion)
  } catch (error) {
    res.status(500).json({ error: error.messsage })
  }
}

exports.deleteQuestion = async (req, res) => {
  try {
    const deleteQuestion = await Question.findByPk(req.params.id)
    if (!deleteQuestion) return res.status(400).json({ error: 'Question not found' })

    await deleteQuestion.destroy()
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}