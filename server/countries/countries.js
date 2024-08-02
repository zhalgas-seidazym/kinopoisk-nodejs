const mongoose = require('mongoose')

const countrySchema = new mongoose.Schema({
    name: String,
    key: Number
})

const Country = mongoose.model('country', countrySchema)

module.exports = Country