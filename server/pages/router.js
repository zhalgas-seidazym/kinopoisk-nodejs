const express = require('express')
const router = express.Router()
const Genre = require('../genres/genres.js')
const Country = require('../countries/countries.js')
const User = require('../auth/users.js')
const Film = require('../films/films.js')
const Rate = require('../rates/rates.js')

const getRates = require('../rates/getRates.js')

router.get('/', async (req, res) => {
    const options = {}
    const genre = await Genre.findOne({key: req.query.genre})
    if(genre){
        options.genre = genre.id
        res.locals.genre = req.query.genre
    }
    let page = 0
    const limit = 5
    if(req.query.page && req.query.page >= 0){
        page = req.query.page
    }
    res.locals.page = page
    if(req.query.search && req.query.search.length > 0){
        options.$or = [
            {
                title_rus: new RegExp(req.query.search, 'i')
            },
            {
                title_eng: new RegExp(req.query.search, 'i')
            }
        ]
        res.locals.search = req.query.search
    }
    const totalFilms = await Film.countDocuments(options)
    const allGenres = await Genre.find()
    const films = await Film.find(options).limit(limit).skip(page * limit).populate('country', 'name').populate('genre', 'name')
    const rates = await getRates(films)
    const user = req.user ? await User.findById(req.user._id) : {}
    res.render('index', {genres: allGenres ,user , films, pages: Math.ceil(totalFilms / limit), rates})
})

router.get('/login', (req,res) => {
    res.render('login', {user: req.user ? req.user : {}})
})

router.get('/register', (req,res) => {
    res.render('register', {user: req.user ? req.user : {}})
})

router.get('/profile/:id', async (req,res) => {
    try{   
        let options = {}
        const genre = await Genre.findOne({key: req.query.genre})
        if(genre){
            options.genre = genre.id
            res.locals.genre = req.query.genre
        }

        const allGenres = await Genre.find()
        let owner = await User.findById(req.params.id).populate('toWatch')
            .populate({path: 'toWatch', populate: {path: 'country'}})
            .populate({path: 'toWatch', populate: {path: 'genre'}})

        if(options.genre){
            owner.toWatch = owner.toWatch.filter(film => film && film.genre.id == options.genre)
        }
        const limit = 4
        let page = 0
        const totalFilms = owner.toWatch.length
        
        if(req.query.page && req.query.page >= 0){
            page = req.query.page
        }
        res.locals.page = page
        let startIndex = page * limit
        let endIndex = startIndex + limit
        owner.toWatch = owner.toWatch.slice(startIndex, endIndex)
        const rates = await getRates(owner.toWatch)
        
        res.render('profile', {
            user: req.user ? req.user : {}, 
            genres: allGenres,
            owner: owner,
            pages: Math.ceil(totalFilms / limit),
            rates
        })
    }catch(e){
        console.log(e.message)
        res.redirect('/not-found')
    }
})

router.get('/admin/:id', async (req,res) => {
    let options = {}
    const genre = await Genre.findOne({key: req.query.genre})
    if(genre){
        options.genre = genre.id
        res.locals.genre = req.query.genre
    }
    let page = 0
    const limit = 4
    if(req.query.page && req.query.page >= 0){
        page = req.query.page
    }
    res.locals.page = page
    const totalFilms = await Film.countDocuments(options)
    const allGenres = await Genre.find()
    const films = await Film.find(options).limit(limit).skip(page * limit).populate('genre', 'name').populate('country', 'name').populate('author')
    const rates = await getRates(films)
    res.render('adminProfile', {genres: allGenres, user: req.user ? req.user : {}, films, pages: Math.ceil(totalFilms / limit), rates})
})

router.get('/new', async (req,res) => {
    const allGenres = await Genre.find()
    const allCountries = await Country.find()
    res.render('newFilm', {genres: allGenres, countries: allCountries, user: req.user ? req.user : {}})
})

router.get('/edit/:id', async (req,res) => {
    const allGenres = await Genre.find()
    const allCountries = await Country.find()
    const film = await Film.findById(req.params.id)
    res.render('editFilm', {genres: allGenres, countries: allCountries, user: req.user ? req.user : {}, film})
})

router.get('/not-found', (req,res) => {
    res.render('not-found', {user: req.user ? req.user : {}})
})

router.get('/detail/:id', async (req, res) => {
    const film = await Film.findById(req.params.id).populate('country').populate('genre')
    const rates = await Rate.find({filmId: req.params.id}).populate('authorId')
    let averageRate = 0
    if (rates.length > 0) {
        for (let i = 0; i < rates.length; i++) {
            averageRate += rates[i].rate;
        }
        averageRate = (averageRate / rates.length * 2).toFixed(1);
    } else {
        averageRate = 'There is no ratings yet';
    }
    res.render('detail', {user: req.user ? req.user : {}, film, rates, averageRate})
})

module.exports = router