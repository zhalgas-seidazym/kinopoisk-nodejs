const Genre = require('./genres.js')

const getAllGenres = async(req, res) => {
    const data = await Genre.find()
    data.sort((a, b) => a - b)
    res.send({data})
}

module.exports = getAllGenres