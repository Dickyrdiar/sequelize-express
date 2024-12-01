'use strict';

const { User, Question, Comments } = require('../models');
const redis = require('../shared/redisClient')

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    
    await redis.del('user:all')

    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.getAllUsers = async (req, res) => {
  const cacheKey = 'user:all'

  try {
    const cacheUsers = await redis.get(cacheKey)
    if (cacheKey) {
      return res.status(200).json(JSON.parse(cacheUsers))
    }

    const users = await User.findAll({
      include: [
        {
          model: Question,
          as: 'questions',
          attributes: ['id', 'question', 'desc'],
          include: [
            {
              model: Comments,
              as: 'comments',
              attributes: ['id', 'content'],
              include: [
                {
                  model: User,
                  as: 'user',
                  attributes: ['id', 'firstName', 'lastName']
                }
              ]
            }
          ]
        }, 
      ]
    })
    console.log(users, "all users")
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getUserById = async (req, res) => {
  try {
    const foundUser = await User.findByPk(req.params.id, {
      include: [
        {
          model: Question,
          as: 'questions',
          attributes: ['id', 'question', 'desc'],
          include: [
            {
              model: Comments,
              as: 'comments',
              attributes: ['id', 'content'],
              include: [
                {
                  model: User,
                  as: 'user',
                  attributes: ['id', 'firstName', 'lastName']
                }
              ]
            }
          ]
        }, 
      ]
    })
    console.log("found user",  delete foundUser.password)

    if (!foundUser) return res.status(404).json({ error: 'User not found' })
    res.json(foundUser)
    delete foundUser.password

    return foundUser
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const foundUser = await User.findByPk(req.params.id)
    if (!foundUser) return res.status(404).json({ error: "User not found" })

    await foundUser.update(req.body)
    res.json(foundUser)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const foundUser = await User.findByPk(req.params.id)
    if (!foundUser) return res.status(404).json({ error: 'User not found' })

    await foundUser.destroy()
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
