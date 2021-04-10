const mongoose = require('mongoose')
let Schema = new mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

let validRoles = {
	values: ['ADMIN_ROLE', 'USER_ROLE'],
	message: '{VALUE} is not a valid role'
}

const schemaUser = new Schema({
	name: {
		type: String,
		required: [true, 'Need name']
	},
	username:{
		type: String,
		required: true,
		unique: true
	},
	games: [{
		type: Schema.Types.ObjectId,
		ref: 'Games'
	}],
	matches: [{
		type: Schema.Types.ObjectId,
		ref: 'Match'
	}],
	platforms: [{
		type:String
	}],
	email: {
		type: String,
		require: [true, 'Need email'],
		unique: true
	},
	password: {
		type: String,
		required: [true, 'Need Password']
	},
	role: {
		type: String,
		default: 'USER_ROLE',
		enum: validRoles
	},
	img:{
		type:String
	},
	status: {
		type: Boolean,
		default: true
	},
	google: {
		type: Boolean,
		default: false
	}
})

schemaUser.methods.toJSON = function(){
	let user = this
	let userObject = user.toObject()
	delete userObject.password
	return userObject
}

schemaUser.plugin(uniqueValidator, {
	message: '{PATH} should be unique'
})

module.exports = mongoose.model('User', schemaUser)