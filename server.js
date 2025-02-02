const express = require('express')
const session = require('express-session')
const mongooseStore = require('connect-mongo')
const passport = require('passport')

const app = express()

require('./server/config/db.js')
require('./server/config/passport.js')
app.use(session({
    name: 'kinopoisk.session',
    secret: 'keyboard cat',
    maxAge: 1000 * 60 * 60 * 7,
    resave: false,
    store: mongooseStore.create({
        mongoUrl: 'mongodb+srv://zhalgasseidazym2005:NXzIpHAJ8Fp7od7U@kinopoisk-app.95x5lts.mongodb.net/'
    })
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded())
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')

app.use(require('./server/pages/router.js'))
app.use(require('./server/genres/router.js'))
app.use(require('./server/countries/router.js'))
app.use(require('./server/auth/router.js'))
app.use(require('./server/films/router.js'))
app.use(require('./server/rates/router.js'))

// https://kinopoisk-node-js.onrender.com/ deploy
// https://dashboard.render.com/web/srv-cqmltqtds78s73914k20/deploys/dep-cqmm055svqrc73fcfgsg  render
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})