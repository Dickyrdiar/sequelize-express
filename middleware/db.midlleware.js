const { Sequelize } = require('../models');

const dbMidlleware = async (req, res, next) => {
  try {
    await Sequelize.authenticate();
    console.log('Database connection estabilished successfully');
    next()
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    res.status(500).json({ message: 'Database connection error' });
  }
}

module.exports = dbMidlleware