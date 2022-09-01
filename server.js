const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')

// Import routers
const characterRouter = require('./routes/characters')
const userRouter = require('./routes/user')

// Create express app
const app = express()

// Middleware
app.use(express.json())

// logging
app.use((req, res, next) => {
	console.log(req.path, req.method)
	next()
})

// Front-end Routes
app.use(express.static(path.resolve(__dirname, './client/build')))
// Step 2:
app.get('*', function (request, response) {
	response.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

// Routes
app.use('/api/characters/', characterRouter)
app.use('/api/user/', userRouter)

// connect to db
mongoose
	.connect(process.env.DB_URL)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(`connected to db & listening on port: ${process.env.PORT}`)
		})
	})
	.catch((error) => {
		console.log(error)
	})
