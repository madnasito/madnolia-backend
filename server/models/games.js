const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema({
	name:{
		type: String,
		required: [true, 'Need name']
	},
	platforms:[{
		Typespe: Schema.Types.ObjectId,
		ref: 'Platform'
	}],
	genre: [{
		type: String
	}],
	released: {
		type: Date
	},
	studio:{
		type: String
	},
	cover:[{
		type: String
	}],
	screenshots:[{
		type: String
	}]
})

module.exports = mongoose.model('Game', gameSchema)