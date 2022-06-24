//Import connection
const mongoose = require('./../db/connection')

// New schema for users
const userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	userName: String,
	characters: [
		{
			ref: 'Character',
			type: mongoose.Schema.Types.ObjectId
		}
	]
})

//export model named "User"
module.exports = mongoose.model('User', userSchema)
