const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://zhalgasseidazym2005:NXzIpHAJ8Fp7od7U@kinopoisk-app.95x5lts.mongodb.net/mydatabase?retryWrites=true&w=majority')
.then(() => console.log('Connected to MongoDB'))
.catch((e) => console.log('Failed to connect to MongoDB'));

// zhalgasseidazym2005
// NXzIpHAJ8Fp7od7U
// 'mongodb+srv://zhalgasseidazym2005:NXzIpHAJ8Fp7od7U@kinopoisk-app.95x5lts.mongodb.net/'