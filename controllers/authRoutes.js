const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('./../models/user')

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return res.status(400).json({ errors: err })
		}
		if (!user) {
			return res.status(400).json({ errors: 'No user found' })
		}
		req.logIn(user, (err) => {
			if (err) {
				return res.status(400).json({ errors: err })
			}
			return User.findById(user.id)
				.populate('characters')
				.then((user) => res.status(200).json({ user: user }))
		})
	})(req, res, next)
})

// // log in request
// router.get('/', (req, res) => {
// 	Character.find().then((characters) => res.json({ characters: characters }))
// })

router.get('/login', function (req, res, next) {
	res.render('login')
})

module.exports = router
