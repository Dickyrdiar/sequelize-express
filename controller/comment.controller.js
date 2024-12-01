'use strict'

const { Comments, Question } = require("../models");
const redis = require("../shared/redisClient");

exports.createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const  {questionId}  = req.params

    // Ensure questionId is passed and is valid
    console.log("question", questionId)

    if (!questionId) {
      return res.status(400).json({ message: 'Question ID is required' });
    }

    // Check if the question exists
    const questionExist = await Question.findByPk(questionId);
    if (!questionExist) {
      return res.status(400).json({ message: 'Question does not exist' });
    }

    if (!content) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    // Create new comment
    const newComment = await Comments.create({
      content,
      questionId, // Associate comment with the question
      userId: req.user.id, // Assuming you have the userId available in req.user
    });

    // Clear Redis cache for comments
    await redis.del('comment:all');
    res.status(201).json(newComment);
  } catch (err) {
    console.log("error", err);
    res.status(400).json({ error: err.message }); // Fixed typo from `err.meessage`
  }
};

exports.getAllComment = async (req, res) => {
  try {
    const getAllComment = await Comments.findAll();
    res.status(200).json(getAllComment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletedComment = async (req, res) => {
  try {
    const foundComment = await Comments.findByPk(req.params.id); // Corrected Comment -> Comments
    if (!foundComment) return res.status(400).json({ error: 'Comment not found' });

    await foundComment.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message }); // Fixed typo from `err.meessage`
  }
};
