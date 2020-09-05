// variable and configuration
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const signUpRoute = require('./routes/signup')
const loginRoute = require('./routes/login')
const logoutRoute = require('./routes/logout')
const authRoute = require('./routes/auth')
// const checkUser = require('./routes/checkUser')
const cookieParser = require('cookie-parser')

require('dotenv').config()

// Use middleware
app.use(express.json())
app.use(cookieParser())

// Route
app.use('/signUp', signUpRoute)
app.use('/login', loginRoute)
app.use('/logout', logoutRoute)
// app.use('/checkUser', checkUser)
app.use('/authentication', authRoute)

// Start up server
app.listen(process.env.PORT, console.log(`Listening to port ${process.env.PORT}`))

// Connect to database
mongoose.connect(process.env.DATABASE_URL)
        .then(console.log('Nodejs server successfully connected to database'))
        .catch(err => console.log(err))
