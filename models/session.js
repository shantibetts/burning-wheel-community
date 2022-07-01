const mongoose = require('./../db/connection')

const SessionSchema = new mongoose.Schema({
	provider: String,
	subject: String,
	session_id: String,
	access_token: String
})

module.exports = mongoose.model('Session', SessionSchema)
