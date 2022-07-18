const express = require('express')
const session = require('express-session')
require('dotenv').config()
const logger = require('morgan')
const cors = require('cors')
const MongoStore = require('connect-mongo')
const mongoose = require('./db/connection')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

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
const originAllowedList = [
	'http://localhost',
	'http://localhost:3000',
	'http://localhost:8080',
	'https://accounts.google.com'
]

const corsOptions = {
	methods: 'GET,POST,PUT,PATCH,DELETE',
	credentials: true,
	origin: process.env.CORS_ORIGIN
	// origin: function (origin, callback) {
	// 	callback(null, true)
	// presentation HACKS
	// console.log(origin)
	// if (originAllowedList.indexOf(origin) !== -1) {
	// 	callback(null, true)
	// } else {
	// 	callback(new Error('origin not allowed by CORS'))
	// }
	// END PRESENTATION HACKS
	// }
}
app.use(cors(corsOptions))

app.use(cookieParser())

// extended false does not allow nested payloads
app.use(bodyParser.urlencoded({ extended: true }))

// Express Session
app.use(
	session({
		secret: 'random-string-for-hash',
		resave: true,
		saveUninitialized: true,
		unset: 'destroy',
		store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
		cookie: { maxAge: 360000, secure: false }
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
