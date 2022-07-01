const express = require('express')
const session = require('express-session')
require('dotenv').config()
const logger = require('morgan')
const cors = require('cors')
const MongoStore = require('connect-mongo')
const mongoose = require('./db/connection')

// Import routers
const characterRouter = require('./controllers/characterRoutes')
const userRouter = require('./controllers/userRoutes')
const authRouter = require('./controllers/authRoutes')

// Import passport setup
const passport = require('./passport/setup')

// Create express app
const app = express()
// Add express app middleware
app.use(express.json())
app.use(logger('dev'))
app.use(cors())
// extended false does not allow nested payloads
app.use(express.urlencoded({ extended: false }))

// Express Session
app.use(
	session({
		secret: 'Not sure what this is for',
		resave: false,
		saveUninitialized: true,
		store: MongoStore.create({ mongoUrl: process.env.DB_URL })
	})
)
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/characters/', characterRouter)
app.use('/users/', userRouter)
app.use('/', authRouter)

app.set('port', process.env.PORT || 8080)

app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`)
})
