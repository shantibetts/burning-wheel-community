//Import connection
const mongoose = require('./../db/connection')

const ThirdPartyProviderSchema = new mongoose.Schema({
	provider_name: {
		type: String,
		default: null
	},
	provider_id: {
		type: String,
		default: null
	},
	provider_data: {
		type: String,
		default: null
	}
})

// New schema for users
const userSchema = new mongoose.Schema(
	{
		name: String,
		email: { type: String, required: true, unique: true },
		email_is_verified: { type: Boolean, default: false },
		password: { type: String, select: false },
		characters: [
			{
				ref: 'Character',
				type: mongoose.Schema.Types.ObjectId
			}
		],
		third_party_auth: [ThirdPartyProviderSchema],
		date: { type: Date, default: Date.now }
	},
	{ strict: false }
)

//export model named "User"
module.exports = mongoose.model('User', userSchema)
