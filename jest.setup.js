const { sequelize } = require('./models')
require('dotenv').config();
process.env.NODE_ENV = 'test';

beforeAll(async () => {
  await sequelize.sync({ force: true })
})

afterAll(async () => {
  await sequelize.close()
})