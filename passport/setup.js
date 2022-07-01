const bcrypt = require('bcryptjs')
const User = require('../models/user')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user)
	})
})

// Local Strategy
passport.use(
	new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
		// May need to add a passwordField: 'password' after username field - does that make it log in only?

		// Find User if existing
		User.findOne({ email: email })
			.then((user) => {
				console.log(user)
				// Create new user if none exists
				if (!user) {
					const newUser = new User({ email, password })
					// Hash password before saving in database
					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if (err) throw err
							newUser.password = hash
							newUser
								.save()
								.then((user) => {
									return done(null, user)
								})
								.catch((err) => {
									return done(null, false, { message: err })
								})
						})
					})
				} else {
					// Match password
					bcrypt.compare(password, user.password, (err, isMatch) => {
						if (err) throw err
						if (isMatch) {
							return done(null, user)
						} else {
							return done(null, false, { message: 'Wrong password' })
						}
					})
				}
			})
			.catch((err) => {
				return done(null, false, { message: err })
			})
	})
)

module.exports = passport