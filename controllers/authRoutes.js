const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('./../models/user')

const CLIENT_URL = 'http://localhost:3000/'

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
			console.log(user)
			return (
				res
					// .status(200)
					// .json({ succsess: `logged in ${user.name}`, user: user })
					.redirect(CLIENT_URL)
			)
			// return User.findById(user.id)
			// 	.populate('characters')
			// 	.then((userData) =>
			// 		res.status(200).json({ user: user, userData: userData })
			// 	)
		})
	})(req, res, next)
})

router.get('/google/login/success', (req, res) => {
	User.findById(req.user._id)
		.populate('characters')
		.then((userData) =>
			res
				.json({
					success: true,
					message: 'successfull',
					user: userData,
					session: req.session
				})
				.redirect(CLIENT_URL + `/users/${userData.name}`)
		)
})

router.get('/google/login/failed', (req, res) => {
	res.status(401).json({ success: false, message: 'login failed' })
})

router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: CLIENT_URL,
		failureRedirect: 'login/failed'
	})
)

router.post('/logout', (req, res) => {
	if (req.user) {
		req.logout()
		res.send({ msg: 'logging out' })
	} else {
		res.send({ msg: 'no user to log out' })
	}
})

module.exports = router
