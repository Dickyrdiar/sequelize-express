const { Question, User } = require('../models')
const redis = require('../shared/redisClient')

exports.createQuestion = async (req, res) => {
  const { question, desc } = req.body

  try {
    const newQuestion = await Question.create({
      question,
      desc,
      userId: req.user.id
    })

    await redis.del('question:all')

    res.status(201).json(newQuestion)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.getAllQuestion = async (req, res) => {
  const cacheKey = 'questions:all'

  try {
    const cacheQuestion = await redis.get(cacheKey)
    if (cacheQuestion) {
      console.log('serving from redis cache')
      return res.status(200).json(JSON.parse(cacheQuestion))
    }

    const questions = await Question.findAll()
    await redis.set(cacheKey, JSON.stringify(questions), 'EX', 3600)
    res.status(200).json(questions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getQuestionById = async (req, res) => {
  const cachekey = `queation:${id}`

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