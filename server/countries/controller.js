const Country = require('./countries')

const getAllCountries = async(req, res) => {
    const data = await Country.find()
    res.status(200).send({data})
}

module.exports = getAllCountries