const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('./../models/user')
require('dotenv').config()

const CLIENT_URL = process.env.CLIENT_URL

router.post('/local', (req, res, next) => {
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
			// return res
			// .status(200)
			// .json({ succsess: `logged in ${user.name}`, user: user })
			// .redirect(CLIENT_URL)
			return User.findById(user.id)
				.populate('characters')
				.then((userData) => res.status(200).json({ userData: userData }))
		})
	})(req, res, next)
})

// router.get('/google/login/success', (req, res) => {
// 	User.findById(req.user._id)
// 		.populate('characters')
// 		.then((userData) =>
// 			res
// 				.json({
// 					success: true,
// 					message: 'successfull',
// 					user: userData,
// 					session: req.session,
// 					cookies: req.cookies
// 				})
// 				.redirect(CLIENT_URL + `/users/${userData.name}`)
// 		)
// })

router.get('/google/login/failed', (req, res) => {
	res.status(401).json({ success: false, message: 'login failed' })
})

// Click log in with google, hits this route
router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
)

// After /google, google re-routes to this route with the req.user
router.get(
	'/google/callback',
	passport.authenticate('google', {
		// Currently this bounces back to the home page with no user info,
		// necessitating the fetch user data button
		successRedirect: CLIENT_URL,
		// This bounces back to the log-in page with a 401 error
		failureRedirect: 'login/failed'
	})
)

// The log-out button hits this route
router.post('/logout', (req, res) => {
	// This SHOULD remove the passport headers
	req.logout(function (err) {
		// This SHOULD remove the current DB session
		req.session.destroy()
		if (err) {
			return res.json({ success: false, message: err })
		}
		res.json({ success: true, message: 'user logged out' })
	})
})

module.exports = router
