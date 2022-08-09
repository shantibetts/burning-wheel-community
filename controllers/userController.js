const User = require('./../models/user')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
	return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
	// destructure email and password from request
	const { email, password } = req.body

	try {
		// find user using static method from userController
		const user = await User.login(email, password)
		// create a token for new user
		const token = createToken(user._id)
		// if no error, return email and user object
		res.status(200).json({ email, token })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

// signup user
const signupUser = async (req, res) => {
	// destructure email and password from request
	const { email, password } = req.body

	try {
		// create user using static method from userController
		const user = await User.signup(email, password)
		// create a token for new user
		const token = createToken(user._id)
		// if no error, return email and user object
		res.status(200).json({ email, token })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

module.exports = { loginUser, signupUser }
