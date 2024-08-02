const express = require('express')
const {createFilm, editFilm, deleteFilm, saveToWatch, deleteFromToWatch} = require('./controller')
const {upload} = require('./multer')
const {isAuth, isAdmin} = require('../auth/middlwares')

const router = express.Router()

router.post('/api/film/new',isAdmin , upload.single('image'), createFilm)
router.post('/api/film/edit', isAdmin, upload.single('image'), editFilm)
router.delete('/api/film/:id', isAdmin, deleteFilm)
router.post('/api/film/save', isAuth, saveToWatch)
router.delete('/api/film/save/:id', isAuth, deleteFromToWatch)

module.exports = router