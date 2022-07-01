const User = require('../models/user.js')
const Character = require('../models/character.js')
const bcrypt = require('bcryptjs')

const characterSeedData = require('./characterSeed.json')

const encryptPassword = (password) => {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(password, salt, (err, hash) => {
			return hash
		})
	})
}

User.find().remove(() => {
	Character.find().remove(() => {
		let shanti = User.create({
			name: 'Shanti Betts',
			email: 'shanti.betts@gmail.com',
			password: encryptPassword('spanky')
		}).then((user) => {
			Promise.all([
				Character.create(characterSeedData[0]).then((character) => {
					user.characters.push(character)
				}),
				Character.create(characterSeedData[1]).then((character) => {
					user.characters.push(character)
				}),
				Character.create(characterSeedData[2]).then((character) => {
					user.characters.push(character)
				})
			]).then(() => user.save())
		})
		let frank = User.create({
			name: 'Shanti Betts Clone',
			email: 'clone@gmail.com',
			password: encryptPassword('spanky2')
		}).then((user) => {
			Promise.all([
				Character.create(characterSeedData[0]).then((character) => {
					user.characters.push(character)
				}),
				Character.create(characterSeedData[1]).then((character) => {
					user.characters.push(character)
				}),
				Character.create(characterSeedData[2]).then((character) => {
					user.characters.push(character)
				})
			]).then(() => user.save())
		})
		let john = User.create({
			name: 'Shanti Betts Clone 2',
			email: 'clone2@gmail.com',
			password: encryptPassword('spanky3')
		}).then((user) => {
			Promise.all([
				Character.create(characterSeedData[0]).then((character) => {
					user.characters.push(character)
				}),
				Character.create(characterSeedData[1]).then((character) => {
					user.characters.push(character)
				}),
				Character.create(characterSeedData[2]).then((character) => {
					user.characters.push(character)
				})
			]).then(() => user.save())
		})
	})
})
