const express = require('express')
const app = express()
const userRouter = require('./routes/authRoutes')
const { sequelize } = require('./models')


require('dotenv').config()

app.use(express.json())

app.use('/users', userRouter)

sequelize.sync()
  .then(() => {
    console.log("Database connected!");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(error => console.log('Unable to connect to the database:', error));