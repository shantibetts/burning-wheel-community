const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

// New schema for users
const userSchema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
})

// static signup method
userSchema.statics.signup = async function (email, password) {
	// validation
	if (!email || !password) {
		throw Error('All fields must be filled')
	}
	if (!validator.isEmail(email)) {
		throw Error('Email is not valid')
	}
	if (!validator.isStrongPassword(password)) {
		throw Error('Password not strong enough')
	}
	// query db to verify email is unique
	const exists = await this.findOne({ email })
	// if email not unique, throw error
	if (exists) {
		throw Error('Email already in use')
	}
	// salt and hash password
	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(password, salt)
	// create user in db
	const user = await this.create({ email, password: hash })
	// user is returned so parent function has access
	return user
}

// static login method
userSchema.statics.login = async function (email, password) {
	// Check there is both an email and a password
	if (!email || !password) {
		throw Error('All fields must be filled')
	}
	// Find user by email
	const user = await this.findOne({ email })
	// if user not found, throw error
	if (!user) {
		throw Error('Incorrect email')
	}
	const match = await bcrypt.compare(password, user.password)

	if (!match) {
		throw Error('Incorrect password')
	}

	return user
}

module.exports = mongoose.model('User', userSchema)
