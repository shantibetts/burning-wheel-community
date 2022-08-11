const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requireAuth = async (req, res, next) => {
	//verify authentication
	const { authorization } = req.headers
	// throw error if not authorization in headers
	if (!authorization) {
		return res.status(401).json({ error: 'Authorization token required' })
	}
	// authorization is a string structured as 'Bearer jsonWebToken'
	// Split on space and take 2nd part to get actual token string
	const token = authorization.split(' ')[1]
	// Validation
	try {
		// jwt.verify returns the jwt payload if valid
		const { _id } = jwt.verify(token, process.env.SECRET)
		// find user by id and attatch to request
		req.user = await User.findOne({ _id }).select('_id')
		console.log('user is', req.user)
		// call next function in line
		next()
	} catch (error) {
		console.log(error)
		res.status(401).json({ error: 'Request is not authorized' })
	}
}

module.exports = requireAuth
