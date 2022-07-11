const User = require('../models/user.js')
const Character = require('../models/character.js')
const bcrypt = require('bcryptjs')

const characterSeedData = require('./characterSeed.json')

const encryptPassword = (password) => {
	let salt = bcrypt.genSaltSync(10)
	let hash = bcrypt.hashSync(password, salt)
	return hash
}
let password = ''
let password2 = ''
let password3 = ''

Promise.all([
	(password = encryptPassword('spanky')),
	(password2 = encryptPassword('spanky2')),
	(password3 = encryptPassword('spanky3'))
]).then(() => {
	User.find().remove(() => {
		Character.find().remove(() => {
			let shanti = User.create({
				name: 'Shanti Betts',
				email: 'shanti.betts@gmail.com',
				password: password
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
				password: password2
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
				password: password3
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
})
