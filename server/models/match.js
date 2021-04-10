const mongoose = require('mongoose');
const Schema = mongoose.Schema

const matchSchema = new Schema({
	game:{
		type: Schema.types.ObjectId,
		ref: 'games',
		required: true
	},
	platform:{
		type: String,
		required: true,
		required: true
	},
	date:{
		type: Date,
		required: true,
		required: true
	},
	user:{
		type: Schema.types.ObjectId,
		ref: 'User',
		required: true
	},
	message: {
		type:String
	}
})

module.exports = mongoose.model('Match',matchSchema)