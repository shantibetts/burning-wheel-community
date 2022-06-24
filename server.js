const express = require('express')
require('dotenv').config()
const logger = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(logger('dev'))
app.use(cors())

const characterRouter = require('./controllers/characterRoutes')
const userRouter = require('./controllers/userRoutes')

app.use('/characters/', characterRouter)
app.use('/users/', userRouter)

app.set('port', process.env.PORT || 8080)

app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`)
})
