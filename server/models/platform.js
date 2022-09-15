const mongoose = require('mongoose')
const Schema = mongoose.Schema

const validCategory = {
    values: ['PlayStation', 'Xbox', 'Nintendo', 'PC', 'Mobile']
}

const platformSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    api_id: {
        type: Number,
        required: true
    },
    ico: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: validCategory
    }
})

module.exports = mongoose.model('Platform', platformSchema)