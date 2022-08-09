// Require relevant models.
const Character = require('../models/character')

const mongoose = require('mongoose')

// GET all characters
const getCharacters = async (req, res) => {
	// get user id from request
	const user_id = req.user._id
	// get characters with that user id
	const characters = await Character.find({ user_id }).sort({ name: 1 })
	// return characters
	res.status(200).json({ characters })
}

//GET a single character
const getCharacter = async (req, res) => {
	// get id from params
	const { id } = req.params
	// check if valid
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such character' })
	}
	// find character by id
	const character = await Character.findById(id)
	// check if valid character
	if (!character) {
		return res.status(404).json({ error: 'No such character' })
	}
	// return character
	res.status(200).json(character)
}

// POST a new character
const createCharacter = async (req, res) => {
	// destructure name from request body
	const { name } = req.body
	// throw error if name is blank
	if (!name) {
		return res.status(400).json({ error: 'Character must have a name' })
	}
	// add character to db and return created character
	try {
		const user_id = req.user._id
		const character = await Character.create(req.body)
		res.status(200).json(character)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

// DELETE a character
const deleteCharacter = async (req, res) => {
	// destruture id from request
	const { id } = req.params
	// check if valid id
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such character' })
	}
	// delete character by id
	const character = await Character.findOneAndDelete({ _id: id })
	// make sure character comes back
	if (!character) {
		return res.status(400).json({ error: 'No such character' })
	}
	// send back deleted character
	res.status(200).json(character)
}

// PATCH a character by id
const updateCharacter = async (req, res) => {
	// destruture id from request
	const { id } = req.params
	// check if valid id
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such character' })
	}
	// update character by id and request
	const character = await Character.findOneAndUpdate(id, req.body, {
		new: true
	})
	// make sure character comes back
	if (!character) {
		return res.status(400).json({ error: 'No such character' })
	}
	// send back updated character
	res.status(200).json(character)
}

module.exports = {
	getCharacters,
	getCharacter,
	createCharacter,
	deleteCharacter,
	updateCharacter
}
