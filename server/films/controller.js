const Film = require('./films')
const User = require('../auth/users')
const fs = require('fs')
const path = require('path')

const createFilm = async (req, res) => {
    if(req.file && req.body.title_rus.length > 2 && req.body.title_eng.length > 2
        && req.body.year > 0 && req.body.time > 10 && req.body.country    
        && req.body.genre 
    ){
        if(req.body.video && req.body.video.length > 2){
            await new Film({
                title_rus: req.body.title_rus,
                title_eng: req.body.title_eng,
                year: req.body.year,
                time: req.body.time,
                country: req.body.country, 
                genre: req.body.genre,
                video: req.body.video,
                image: `/images/films/${req.file.filename}`,
                author: req.user._id
            }).save()
        }
        else if(req.body.series && req.body.series.length > 0){
            await new Film({
                title_rus: req.body.title_rus,
                title_eng: req.body.title_eng,
                year: req.body.year,
                time: req.body.time,
                country: req.body.country, 
                genre: req.body.genre,
                series: req.body.series,
                image: `/images/films/${req.file.filename}`,
                author: req.user._id
            }).save()
        }
        res.redirect(`/admin/${req.user._id}`)
    }
    else {res.redirect('/new?error=1')}
}

const editFilm = async (req, res) => {
    if(req.file && req.body.title_rus.length > 2
        && req.body.year > 0 && req.body.title_eng.length > 2
        && req.body.time > 10 && req.body.country 
        && req.body.genre
    ){
        const film = await Film.findById(req.body.id)
        fs.unlinkSync(path.join(__dirname + '../../../public' + film.image))
        film.title_rus = req.body.title_rus
        film.title_eng = req.body.title_eng
        film.year = req.body.year
        film.time = req.body.time
        film.country = req.body.country
        film.genre = req.body.genre
        film.image = `/images/films/${req.file.filename}`
        film.author = req.user
        if(req.body.video && req.body.video.length > 2){
            film.video = req.body.video
        }
        else if(req.body.series && req.body.series.length > 0){
            film.series = req.body.series
        }
        await film.save()
        res.redirect('/admin/' + req.user.id)
    }
    else {
        res.redirect(`/edit/${req.body.id}?error=1`)
    }
}

const deleteFilm = async (req, res) => {
    const film = await Film.findById(req.params.id)
    console.log(film);
    if(film){
        fs.unlinkSync(path.join(__dirname + '../../../public' + film.image))
        await Film.deleteOne({_id: req.params.id})
        res.status(200).send('ok')
    }
    else {
        res.status(400).send('not-found')
    }
}

const saveToWatch = async (req, res) => {
    if(req.user && req.body.id){
        const user = await User.findById(req.user.id)
        if(!user.toWatch.includes(req.body.id)){
            user.toWatch.push(req.body.id)
            await user.save()
        }
        res.send('Фильм успешно сохранен')
    }
    else{
        res.send('Фильм уже сохранен')
    }
}

const deleteFromToWatch = async (req, res) => {
    if(req.user && req.params.id){
        const user = await User.findById(req.user.id)
        for(let i = 0; i < user.toWatch.length; i++){
            if(user.toWatch[i] == req.params.id){
                user.toWatch.splice(i, 1)
                await user.save()
                res.send('Успешно удалено')
            }
        }
    }
}

module.exports = {createFilm, editFilm, deleteFilm, saveToWatch, deleteFromToWatch}