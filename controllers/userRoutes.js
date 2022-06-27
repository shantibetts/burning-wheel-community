const express = require('express')
const router = express.Router()

// Require relevant models.
const Character = require('../models/character')
const User = require('../models/user')

// GET all users
router.get('/', (req, res) => {
	User.find()
		.populate('characters', ['firstName', 'lastName'])
		.then((users) => res.json({ users: users }))
})

// POST a new user
router.post('/', (req, res) => {
	User.create(req.body).then((user) => res.status(201).json({ user: user }))
})

//GET user by id
router.get('/:id', (req, res) => {
	User.findById(req.params.id)
		.populate('characters', ['firstName', 'lastName'])
		.then((user) => res.json({ user: user }))
})

//GET user by username
router.get('/username/:username', (req, res) => {
	User.findOne({ userName: req.params.username })
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
