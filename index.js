const express = require('express')
const app = express()
const userRouter = require('./routes/authRoutes')
const { sequelize } = require('./models')
const routerLogin = require('./routes/loginRoutes')
const authMiddleWare = require('./middleware/auth.middleware')

require('dotenv').config()

app.use(express.json())

app.use('/users', userRouter)
app.use('/auth', routerLogin)
app.get('/protected', authMiddleWare, (req, res) => {
  res.json({ message: 'This is protected route' })
})

sequelize.sync()
  .then(() => {
    console.log("Database connected!");
    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(error => console.log('Unable to connect to the database:', error));