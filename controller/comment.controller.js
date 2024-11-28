'use strict'

const {Comments, Question}  = require("../models")
const redis = require("../shared/redisClient")

exports.createComment = async (req, res) => {
  try {
    const { content } = req.body 
    const { questionId } = req.params

    const questionExist = await Question.findByPk(questionId)
    console.log("exist", questionExist)

    if (!questionExist) {
      return res.status(404).json({ error: 'Question not found' })
    }

    const newComment = await Comments.create({
      content,
      questionId,
      userId: req.user.id,
    }) 

    await redis.del('comment:all')
    res.status(201).json(newComment)
  } catch (err) {
    console.log("error", err)
    res.status(400).json({ error: err.meessage })
  }
}

exports.getAllComment = async (req, res) => {
  try {
    const getAllComment = await Comments.findAll()
    res.status(200).json(getAllComment)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.deletedComment = async (req, res) => {
  try {
    const foundComment = await Comment.findByPk(req.params.id)
    if (!foundComment) return res.status(400).json({ error: 'Comment not found' })

    await foundComment.destroy()
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ error: err.meessage })
  }
}