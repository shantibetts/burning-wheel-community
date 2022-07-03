const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('./../models/user')

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user) => {
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
				.then((userData) =>
					res.status(200).json({ user: user, userData: userData })
				)
		})
	})(req, res, next)
})

router.post('/logout', (req, res) => {
	if (req.user) {
		req.logout()
		res.send({ msg: 'logging out' })
	} else {
		res.send({ msg: 'no user to log out' })
	}
})

module.exports = router
