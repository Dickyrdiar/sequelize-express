const express = require('express')
const app = express()
const userRouter = require('./routes/authRoutes')
const { sequelize } = require('./models')
const routerLogin = require('./routes/loginRoutes')
const authMiddleWare = require('./middleware/auth.middleware')
const routerQuestion = require('./routes/questionRoutes')
const protectedRouter = require('./routes/protectedRoutes')
const  cors  = require('cors')
const routerComment = require('./routes/commentRoutes')

require('dotenv').config()

app.use(express.json())
app.use(cors())

app.use('/auth', routerLogin)
app.use('/users', authMiddleWare,  userRouter )
app.use('/questions', authMiddleWare, routerQuestion )
app.use('/comment', authMiddleWare, routerComment )

// protected 
app.use('/protected', authMiddleWare, protectedRouter)

sequelize.sync()
  .then(() => {
    console.log("Database connected!");
    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(error => console.log('Unable to connect to the database:', error));