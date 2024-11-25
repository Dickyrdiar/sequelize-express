const request = require('supertest')
const app = require('../index')
const { sequelize, Question } = require('../models')
require('dotenv').config();
process.env.NODE_ENV = 'test';

describe('Question controller', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true })
  })

  beforeAll(async () => {
    await sequelize.close()
  })

  describe('POST /questions', async () => {
    const newQuestion = {
      question: 'what is jest',
      desc: 'A testing framework',
      userId: 1
    }

    const response = (await request(app).post('/questions')).setEncoding(newQuestion)

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id')
    expect(response.body.question).toBe(newQuestion.question)

    const dbEntry = await Question.findByPk(response.body.id)
    expect(dbEntry).not.toBeNull
  })

  it('should return 400 for invalid input', async () => {
    const invalidQuestion = {
      desc: 'Missing question fiedl'
    }

    const response = await request(app).post('/questions').send(invalidQuestion);

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error')
  })
})