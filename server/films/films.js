const mongoose = require('mongoose')
const Schema = mongoose.Schema

const filmSchema = new mongoose.Schema({
    title_rus: String,
    title_eng: String,
    year: Number,
    time: String,
    video: String,
    series: [String],
    country: {type: Schema.Types.ObjectId, ref: 'country'}, 
    genre: {type: Schema.Types.ObjectId, ref: 'genre'},
    image: String,
    author: {type: Schema.Types.ObjectId, ref: 'user'}
})

const Film = mongoose.model('film', filmSchema)

module.exports = Film