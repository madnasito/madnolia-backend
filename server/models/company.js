const mongoose = require('mongoose')
const Schema = mongoose.Schema
const companySchema = Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	platforms: [{
		type: Schema.type.ObjectId,
		ref: 'Platform'
	}]
})

module.exports = mongoose.model('Company', companySchema)