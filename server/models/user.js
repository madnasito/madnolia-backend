const mongoose = require('mongoose')
const Schema = mongoose.Schema

let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valir role'
}

let validPlatforms = {
    values: [
        '15', '16', '17', '18', '19', '187',
        '1', '80', '14', '186',
        '7', '8', '10', '11'
    ]
}

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Need name']
    },
    username: {
        type: String,
        required: [true, 'Need username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Need email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Need email'],
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validRoles
    },
    img: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    matches: [{
        type: Schema.Types.ObjectId,
        ref: 'Match'
    }],
    victorys: {
        type: Number,
        default: 0
    },
    platforms: [{
        type: String,
        enum: validPlatforms
    }],
    games: [{
        type: Number
    }],
    acceptInvitations: {
        type: Boolean,
        default: true
    },
    partners: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject()
    delete userObject.password
    return userObject
}

module.exports = mongoose.model('User', userSchema)