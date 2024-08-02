const Rate = require('./rates.js')

async function getRates(films) {
    const rateFilm = []

    for (const film of films) {
        const rateVal = { id: film.id }

        try {
            const rates = await Rate.find({ filmId: film._id })

            let averageRate = 0
            if (rates.length > 0) {
                for (const rate of rates) {
                    averageRate += rate.rate
                }
                rateVal.rate = (averageRate * 2 / rates.length).toFixed(1)
            } else {
                rateVal.rate = '?'
            }
        } catch (error) {
            console.error(`Error fetching rates for film ${film.id}:`, error)
            rateVal.rate = '?'
        }

        rateFilm.push(rateVal)
    }

    return rateFilm
}


module.exports = getRates