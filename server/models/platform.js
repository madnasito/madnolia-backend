const mongoose = require('mongoose')
const Schema = mongoose.Schema
const platformSchema({
	name: {
		type: String,
		required: [true, 'Need name'],
		unique: true
	},
	logo:{
		type: String,
		required: true	
	},
	company:{
		type:Schema.type.ObjectId,
		ref: 'Company'
	}
})

module.exports = mongoose.model('Platform', platformSchema)