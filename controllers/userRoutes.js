const express = require('express')
const router = express.Router()

// Require relevant models.
const Character = require('./../models/Character')
const User = require('./../models/User')

// GET all users
router.get('/', (req, res) => {
	User.find()
		.populate('character', ['firstName', 'lastName'])
		.then((users) => res.json({ users: users }))
})

// POST a new user
router.post('/', (req, res) => {
	User.create(req.body).then((user) => res.status(201).json({ user: user }))
})

//GET user by id
router.get('/:id', (req, res) => {
	User.find({ id: req.params.id })
		.populate('character', ['firstName', 'lastName'])
		.then((user) => res.json({ user: user }))
})

// PATCH user by id
router.patch('/:id', (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.populate('character', ['firstName', 'lastName'])
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
