const express = require('express')
const router = express.Router()
const writeDataGenres = require('./seed.js')
const getAllGenres = require('./controller')


writeDataGenres()

router.get('/api/genres', getAllGenres)

module.exports = router