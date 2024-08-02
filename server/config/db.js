const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://zhalgasseidazym2005:NXzIpHAJ8Fp7od7U@kinopoisk-app.95x5lts.mongodb.net/',
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase the server selection timeout
    socketTimeoutMS: 45000 // Increase the socket timeout
    }
)
.then(() => console.log('Connected to MongoDB'))
.catch((e) => console.log('Failed to connect to MongoDB'));

// zhalgasseidazym2005
// NXzIpHAJ8Fp7od7U