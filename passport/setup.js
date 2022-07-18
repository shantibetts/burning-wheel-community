const bcrypt = require('bcryptjs')
const User = require('./../models/user')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
require('dotenv').config()

passport.serializeUser((id, done) => {
	done(null, id)
})

// REPLACED with below to try to pull user data out of STORE
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user)
	})
})

// Seems to pull same user as above
// passport.deserializeUser((req, user, done) => {
// 	store.findUser(null, { userName: user.email }, async (err, existingUser) => {
// 		if (err) {
// 			return done(err)
// 		}
// 		if (existingUser) {
// 			return done(null, existingUser) // return valid object if user exists in our database
// 		} else {
// 			return done(null, false) // return false if user doesn't exists
// 		}
// 	})
// })

// Local Strategy
passport.use(
	new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
		// Find User if existing
		User.findOne({ email: email })
			.select('+password')
			.then((user) => {
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
									return done(null, user._id)
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
							return done(null, user._id)
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

// Google Strategy
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/google/callback',
			userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
		},
		function (accessToken, refreshToken, profile, cb) {
			User.findOne({ email: profile.emails[0].value }, function (err, user) {
				return cb(err, user._id)
			})
		}
	)
)

module.exports = passport
