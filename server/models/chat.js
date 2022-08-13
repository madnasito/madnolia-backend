const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
    message: [{
        type: Schema.Types.ObjectId,
        ref: 'message'
    }]
})

module.exports = mongoose.model('Chat', chatSchema)