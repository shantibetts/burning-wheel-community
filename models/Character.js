//import connection
const mongoose = require('../db/connection')

// New schema for charactesr
const characterSchema = new mongoose.Schema({
	characterName: String,
	game: String,
	dateCreated: Date,
	dateEdited: Date,
	isTrash: Boolean,
	stock: String,
	age: Number,
	lifepaths: [{ name: String, setting: String }],
	beliefs: [
		{ name: String, description: String, action: String, isActive: Boolean }
	],
	instincts: [{ name: String, description: String }],
	traits: [{ name: String, description: String, callOn: String }],
	artha: [],
	stats: [
		{
			name: String,
			shade: String,
			exponent: Number,
			tax: Number,
			routine: Number,
			difficult: Number,
			challenging: Number,
			fate: Number,
			persona: Number,
			deeds: Number
		}
	],
	attributes: [
		{
			name: String,
			shade: String,
			exponent: Number,
			tax: Number,
			routine: Number,
			difficult: Number,
			challenging: Number,
			fate: Number,
			persona: Number,
			deeds: Number
		}
	],
	skills: [
		{
			name: String,
			shade: String,
			exponent: Number,
			tax: Number,
			routine: Number,
			difficult: Number,
			challenging: Number,
			fate: Number,
			persona: Number,
			deeds: Number,
			root1: String,
			root2: String
		}
	],
	skillsLearning: [
		{
			name: String,
			shade: String,
			exponent: Number,
			tax: Number,
			routine: Number,
			difficult: Number,
			challenging: Number,
			fate: Number,
			persona: Number,
			deeds: Number,
			root1: String,
			root2: String
		}
	],
	relationships: [
		{ name: String, exponent: Number, shade: String, description: String }
	],
	affiliations: [
		{ name: String, exponent: Number, shade: String, description: String }
	],
	aliases: [{ name: String, description: String }],
	titles: [
		{ name: String, exponent: Number, shade: String, description: String }
	],
	funds: [
		{ name: String, exponent: Number, shade: String, description: String }
	],
	property: [
		{ name: String, exponent: Number, shade: String, description: String }
	],
	debt: [
		{ name: String, exponent: Number, shade: String, description: String }
	],
	wounds: [
		{
			severity: String,
			penalty: Number,
			recoveryTime: Number,
			recoveryScale: String
		}
	],
	spells: [
		{
			name: String,
			ob: Number,
			actions: Number,
			description: String,
			origin: String,
			element: String,
			duration: String,
			areaOfEffect: String,
			impetus: String
		}
	],
	meleeWeapons: [
		{
			name: String,
			weaponPower: Number,
			add: Number,
			weaponSpeed: Number,
			versusArmor: Number,
			weaponLength: String,
			handedness: String,
			shade: String
		}
	],
	missileWeapons: [
		{
			name: String,
			dieOfFate: [],
			incedental: Number,
			mark: Number,
			superb: Number,
			versusArmor: [],
			action: String,
			actionSpeed: Number,
			shade: String,
			ammunition: [
				{
					name: String,
					IMS: Number,
					VA: Number,
					DoF: [],
					range: Number,
					toHit: Number
				}
			]
		}
	],
	thrownWeapons: [
		{
			name: String,
			dieOfFate: [],
			weaponPower: Number,
			versusArmor: Number,
			shade: String
		}
	],
	armor: [
		{ location: String, armorType: String, protection: Number, shade: String }
	],
	gear: [
		{
			name: String,
			description: String,
			expendible: Boolean,
			isexpended: Boolean
		}
	],
	notes: [{ name: String, description: String }]
})

//export model
module.exports = mongoose.model('Character', characterSchema)
