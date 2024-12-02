const { Question, User, Comments, Tags } = require('../models')
const { Op, where } = require('sequelize')
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

exports.searchQuestion = async (req, res) => {
  const { paramsSearch } = req.params

  try {

    const responseSearch = await Question.findOne({
      where: {
        question: { [Op.like]: `%${paramsSearch}` }
      },

      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }, 

        {
          model: Comments,
          as: 'comments',
          attributes: ['id', 'content']
        }
      ]
    })

    if (!responseSearch) {
      return res.status(404).json({ message: 'No Matching question found' })
    }

    console.log(responseSearch.find(req.user.id))
    res.status(200).json(responseSearch)
  } catch (err) {
    console.log("error", err)
    res.status(500).json({ error: err.message })
  }
}

exports.getAllQuestion = async (req, res) => {
  const cacheKey = 'questions:all'
  const userId = req.user.id

  try {
    const cacheQuestion = await redis.get(cacheKey)
    if (cacheQuestion) {
      console.log('serving from redis cache')
      return res.status(200).json(JSON.parse(cacheQuestion))
    }

    const questions = await Question.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email'], // User details
        },
        {
          model: Comments,
          as: 'comments',
          attributes: ['id', 'content'],
          include: [
            {
              model: User, // Optionally, include commenter details
              as: 'user',
              attributes: ['id', 'firstName', 'lastName'],
            },
          ], // Comment details
        },
      ],
    })

    await redis.set(cacheKey, JSON.stringify(questions), 'EX', 3600)
    res.status(200).json(questions)
    console.log("find question", questions)
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ error: error.message })
  }
}

exports.getQuestionById = async (req, res) => {
  // const cachekey = `question:${id}`

  try {
    const foundQuestion = await Question.findOne({
      id: req.params.id,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email'], // Include user details
        },
        {
          model: Comments,
          as: 'comments',
          attributes: ['id', 'content', 'userId'], // Include comments details
          include: [
            {
              model: User, // Optionally, include commenter details
              as: 'user',
              attributes: ['id', 'firstName', 'lastName'],
            },
          ],
        },
      ]
      
    });
    if (!foundQuestion) return res.status(400).json({ error: "User not Found" })

    res.json(foundQuestion)
  } catch (error) {
    console.log("err", error)
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