const express = require('express')
const router = express.Router()
const passport = require('passport')

// Require relevant models.
const Character = require('./../models/character')
const User = require('./../models/user')

// HACK FOR PRESENTATION: UNCOMMENT ORIGIANL FUNCTION
// Check for authentication
// checkAuthenticated = (req, res, next) => {
// 	console.log('Page requested:')
// 	console.log(req.method)
// 	console.log(req.session)
// 	console.log(req.cookies)
// 	console.log(req.body)
// 	if (req.isAuthenticated()) {
// 		return next()
// 	}
// 	res.status(401).json({ error: 'could not authenticate credentials' })
// }
// DUMMY FUNCTION TO BYPASS AUTH
checkAuthenticated = (req, res, next) => {
	return next()
}
// END HACK

// GET all users
router.get('/', (req, res) => {
	User.find()
		.populate('characters', ['characterName', 'game', 'dateCreated', 'isTrash'])
		.then((users) => res.json({ users: users }))
})

// HACK FOR PRESENTATION
// replace checkAuthenticated with
// passport.authenticate('google', { scope: ['profile', 'email'] })
// END HACK

// GET user by logIn
router.get('/login', checkAuthenticated, (req, res, next) => {
	console.log('users/Login user:', req.user)
	// What is req.body.owner? Why is this set here?
	req.body.owner = req.user._id
	// Find's user by req.user._id and returns user with characters
	User.findById(req.user._id)
		.populate('characters')
		.then((userData) => res.json({ user: userData }))
})

// POST a new user
router.post('/', (req, res) => {
	User.create(req.body).then((user) => res.status(201).json({ user: user }))
})

//GET user by id
router.get('/:id', checkAuthenticated, (req, res) => {
	console.log(req.session.passport.user)
	User.findById(req.params.id)
		.populate('characters')
		.then((user) => res.json({ user: user }))
})

//GET user by email
router.get('/email/:email', (req, res) => {
	User.findOne({ email: req.params.email })
		.populate('characters')
		.then((user) => res.json({ user: user }))
})

// PATCH user by id
router.patch('/:id', (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.populate('characters', ['firstName', 'lastName'])
		.then((user) => res.json({ user: user }))
})

// DELETE user by id
router.delete('/:id', (req, res) => {
	User.findByIdAndDelete(req.params.id).then((user) => {
		res.json({ user: user })
	})
})

// To Do: PATCH by ID and character ID to assign characters

module.exports = router
