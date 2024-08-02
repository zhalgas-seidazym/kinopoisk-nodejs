const Rate = require('./rates')

const saveRate = async (req, res) => {
    if(req.body.authorId && req.body.authorId && req.body.rate){
        await new Rate({
            rate: req.body.rate,
            text: req.body.text,
            filmId: req.body.filmId,
            authorId: req.body.authorId,
            date: Date.now()
        }).save()
    }
    res.status(200).send(true)
}

module.exports = {saveRate}