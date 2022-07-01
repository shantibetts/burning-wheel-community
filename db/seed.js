const User = require('../models/user.js')
const Character = require('../models/character.js')

const characterSeedData = require('./characterSeed.json')

User.find().remove(() => {
	Character.find().remove(() => {
		let shanti = User.create({
			name: 'Shanti Betts',
			email: 'shanti.betts@gmail.com',
			password: 'spanky'
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
			name: 'Shanti Betts2',
			email: 'shanti.betts2@gmail.com',
			password: 'spanky2'
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
			name: 'Shanti Betts3',
			email: 'shanti.betts3@gmail.com',
			password: 'spanky3'
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
