const Genre = require('./genres.js')
const data = [
    'Комедии', 'Мультфильмы', 'Ужасы', 'Фантастика', 'Триллеры', 'Боевики',
    'Мелодрамы', 'Детективы', 'Приключения', 'Фэнтези', 'Военные', 'Семейные',
    'Аниме', 'Исторические', 'Драмы', 'Документальные', 'Детские', 'Криминал',
    'Биографии', 'Вестерны', 'Фильмы-нуар', 'Спортивные', 'Реальное ТВ',
    'Короткометражки', 'Музыкальные', 'Мюзиклы', 'Ток-шоу', 'Игры'
]

async function writeDataGenres(){
    const length = await Genre.countDocuments({})
    if(length == 0) {
        await data.map((item, index) => {
            new Genre({
                name: item,
                key: index
            }).save()
        }) 
    }
}

module.exports = writeDataGenres