const express = require('express')
const router = express.Router()
const passport = require('passport')

// Require relevant models.
const Character = require('./../models/character')

// HACK FOR PRESENTATION: UNCOMMENT ORIGIANL FUNCTION
// Check for authentication
checkAuthenticated = (req, res, next) => {
	console.log('Page requested:')
	console.log('method requested:', req.method)
	console.log('session requested:', req.session)
	console.log('cookies requested:', req.cookies)
	console.log('body requested:', req.body)
	console.log('is Authenticated:', req.isAuthenticated())
	if (req.isAuthenticated()) {
		return next()
	}
	res.status(401).json({ error: 'could not authenticate credentials' })
}

// DUMMY FUNCTION TO BYPASS AUTH
// checkAuthenticated = (req, res, next) => {
// 	return next()
// }
// END HACK

// GET all characters
router.get('/', (req, res) => {
	Character.find().then((characters) => res.json({ characters: characters }))
})

// POST a new character
router.patch('/', checkAuthenticated, (req, res) => {
	Character.create(req.body).then((character) =>
		res.status(201).json({ character: character })
	)
})

//GET character by id
router.get('/:id', (req, res) => {
	Character.findById(req.params.id).then((character) =>
		res.json({ character: character })
	)
})

// HACK FOR PRESENTATION
// replace checkAuthenticated with
// passport.authenticate('google', { scope: ['profile', 'email'] })
// END HACK

// PATCH character by id
router.patch('/:id', checkAuthenticated, (req, res, next) => {
	console.log('user is ', req.body)
	// req.body.owner = req.user._id
	Character.findByIdAndUpdate(req.params.id, req.body.updateBody, {
		new: true
	}).then((character) => {
		// console.log(character)
		res.json({ character: character })
	})
})

// DELETE character by id
router.delete('/:id', checkAuthenticated, (req, res) => {
	Character.findByIdAndDelete(req.params.id).then((character) => {
		res.json({ character: character })
	})
})

module.exports = router
