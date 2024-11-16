const { Question, User } = require('../models')

exports.createQuestion = async (req, res) => {
  const content = req.body

  try {
    const newQuestion = await Question.create({
      content,
      userId: req.user.id
    })

    console.log("check id", User.id)
    res.status(201).json(newQuestion)
  } catch (error) {
    console.log("check id", User.id)
    res.status(400).json({ error: error.message })
  }
}

exports.getAllQuestion = async (req, res) => {
  try {
    const questions = await Question.findAll({
      include: { model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email'] }
    })
    res.json(questions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getQuestionById = async (req, res) => {
  try {
    const foundQuestion = await Question.findOne({
      where: { id: req.params.id },
      include: { model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email'] }
    })
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