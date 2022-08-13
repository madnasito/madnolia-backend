const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Message', messageSchema)