const User = require('../models/user.js')
const Character = require('../models/character.js')

const characterSeedData = require('./characterSeed.json')

User.find().remove(() => {
	Character.find().remove(() => {
		let shanti = User.create({
			firstName: 'Shanti',
			lastName: 'Betts',
			userName: 'SBetts'
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
			firstName: 'David',
			lastName: 'Bennette',
			userName: 'DBennette'
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
			firstName: 'Keshava',
			lastName: 'Betts',
			userName: 'MeditatingMan108'
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
