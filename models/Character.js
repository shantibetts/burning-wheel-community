//import connection
const mongoose = require('../db/connection')

// New schema for charactesr
const characterSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	game: String,
	dateCreated: Date,
	dateEdited: Date,
	isTrash: Boolean,
	stock: String,
	age: Number,
	lifepaths: [{ name: String, setting: String }],
	beliefs: [
		{ number: Number, core: String, action: String, isActive: Boolean }
	],
	instincts: [{ number: Number, description: String }],
	traits: [{ name: String, description: String, callOn: String }],
	artha: { fate: Number, persona: Number, deeds: Number },
	stats: {
		will: [],
		perception: [],
		power: [],
		forte: [],
		agility: [],
		speed: []
	},
	attributes: {
		health: [],
		reflexes: [],
		steel: [],
		hesitation: [],
		resources: [],
		circles: []
	},
	skills: [{ name: String, values: [] }],
	skillsLearning: [{ name: String, values: [] }],
	relationships: [{ name: String, strength: Number, description: String }],
	affiliations: [{ name: String, strength: Number, description: String }],
	aliases: [{ name: String, description: String }],
	titles: [{ name: String, strength: Number, description: String }],
	funds: [{ name: String, strength: Number, description: String }],
	property: [{ name: String, strength: Number, description: String }],
	debt: [{ name: String, strength: Number, description: String }],
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
			ammunition: [{ name: String, values: [] }]
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
	armor: [{ location: String, armorType: String, protection: Number }],
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
