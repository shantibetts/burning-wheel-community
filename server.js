const express = require('express')
const session = require('express-session')
require('dotenv').config()
const logger = require('morgan')
const cors = require('cors')
const MongoStore = require('connect-mongo')
const mongoose = require('./db/connection')
const bodyParser = require('body-parser')

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
app.use(
	cors({
		origin: 'http://localhost:3000',
		methods: 'GET,POST,PUT,PATCH,DELETE',
		credentials: true
	})
)
// extended false does not allow nested payloads
app.use(bodyParser.urlencoded({ extended: true }))

// Express Session
app.use(
	session({
		secret: 'random-string-for-hash',
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({ mongoUrl: process.env.DB_URL })
	})
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())
// *** added by passport docs, no idea what it does, but didn't help authenticate = true
app.use(passport.authenticate('session'))

// Routes
app.use('/characters/', characterRouter)
app.use('/users/', userRouter)
app.use('/auth/', authRouter)

app.set('port', process.env.PORT || 8080)

app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`)
})
