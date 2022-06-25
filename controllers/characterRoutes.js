const express = require('express')
const router = express.Router()

// Require relevant models.
const Character = require('../models/character')

// GET all characters
router.get('/', (req, res) => {
	Character.find().then((characters) => res.json({ characters: characters }))
})

// POST a new character
router.post('/', (req, res) => {
	Character.create(req.body).then((character) =>
		res.status(201).json({ character: character })
	)
})

//GET character by id
router.get('/:id', (req, res) => {
	Character.find({ id: req.params.id }).then((characters) =>
		res.json({ characters: characters })
	)
})

// PATCH character by id
router.patch('/:id', (req, res) => {
	Character.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
		(character) => res.json({ character: character })
	)
})

// DELETE character by id
router.delete('/:id', (req, res) => {
	Character.findByIdAndDelete(req.params.id).then((character) => {
		res.json({ character: character })
	})
})

module.exports = router
