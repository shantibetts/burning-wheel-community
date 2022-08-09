const express = require('express')
const {
	createCharacter,
	getCharacters,
	getCharacter,
	deleteCharacter,
	updateCharacter
} = require('./../controllers/characterController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// Requires auth to run successfully before allowing access to routes below
router.use(requireAuth)

// GET all characters
router.get('/', getCharacters)

//GET a single character
router.get('/:id', getCharacter)

// POST a new character
router.post('/', createCharacter)

// DELETE a character
router.delete('/:id', deleteCharacter)

// UPDATE a character
router.patch('/:id', updateCharacter)

module.exports = router
