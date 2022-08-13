const mongoose = require('mongoose');
const Schema = mongoose.Schema

const matchSchema = new Schema({
    game: {
        required: [true, 'Hey you forgot your game!'],
        type: Number
    },
    platform: {
        type: Number,
        required: [true, 'Need platform']
    },
    date: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    active: {
        type: Boolean,
        default: true
    },
    img: {
        type: String
    }
})

module.exports = mongoose.model('Match', matchSchema)