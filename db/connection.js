const mongoose = require('mongoose')

let mongoURI = ''
if (process.env.NODE_ENV === 'production') {
	mongoURI = process.env.DB_URL
} else {
	mongoURI = 'mongodb://localhost:27017/burning-wheel-community-api'
}

mongoose.connect(mongoURI)
// mongoose.connect("mongodb://127.0.0.1:27017/cooks_books_api")

module.exports = mongoose
