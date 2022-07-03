const express = require('express')
const router = express.Router()

// Require relevant models.
const Character = require('../models/character')

// Check for authentication
checkAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next()
	}
	res.redirect('/')
}

// GET all characters
router.get('/', (req, res) => {
	Character.find().then((characters) => res.json({ characters: characters }))
})

// POST a new character
router.post('/', checkAuthenticated, (req, res) => {
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

// PATCH character by id
router.patch('/:id', checkAuthenticated, (req, res) => {
	console.log(req.body)
	Character.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
		(character) => {
			console.log(character)
			res.json({ character: character })
		}
	)
})

// DELETE character by id
router.delete('/:id', checkAuthenticated, (req, res) => {
	Character.findByIdAndDelete(req.params.id).then((character) => {
		res.json({ character: character })
	})
})

module.exports = router
