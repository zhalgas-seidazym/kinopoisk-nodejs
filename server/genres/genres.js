const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    name: String,
    key: Number
})

const Genre = mongoose.model('genre', genreSchema)

module.exports = Genre