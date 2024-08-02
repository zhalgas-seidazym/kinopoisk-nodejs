const express = require('express')
const router = express.Router()
const getAllCountries = require('./controller')
const writeDataCountry = require('./seed.js')


writeDataCountry()

router.get('/api/countries', getAllCountries)

module.exports = router