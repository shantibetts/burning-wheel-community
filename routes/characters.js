const express = require('express')
const {
	getGlobalCharacterList,
	createCharacter,
	getCharacterList,
	getCharacter,
	deleteCharacter,
	updateCharacter,
	updateAttribute
} = require('./../controllers/characterController')
const requireAuth = require('../middleware/requireAuth')
const Character = require('./../models/character')

const router = express.Router()

// Requires auth to run successfully before allowing access to routes below
router.use(requireAuth)

// GET all characters
router.get('/allCharacters', getGlobalCharacterList)

// GET CharacterList by userId
router.get('/', getCharacterList)

//GET a single character
router.get('/:id', getCharacter)

// POST a new character
router.post('/', createCharacter)

// DELETE a character
router.delete('/:id', deleteCharacter)

// UPDATE a character
router.patch('/:id', updateCharacter)

// UPDATE a character attribute
router.patch('/:id/:attribute/:attributeId', updateAttribute)

module.exports = router
