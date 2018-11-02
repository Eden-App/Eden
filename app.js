require('dotenv').config()
const express = require('express'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      db = mongoose.connection,

      port = process.env.PORT || 3000,
      app = express()


mongoose.connect('mongodb://localhost:27017/eden-app')
db
    .on('error', console.error.bind(console, 'database connection error:'))
    .once('open', function() {
        console.log('database connected')
    });

const mangaRouter = require('./routes/mangaeden'),
      newsRouter = require('./routes/news'),
      userRoute = require('./routes/user')


const userRoute = require('./routes/user')
 

app
    .use(express.urlencoded({ extended:false }))
    .use(express.json())
    .use(cors())

    .use('/news', newsRouter)
    .use('/mangas', mangaRouter)
    .use('/users', userRoute)


    .listen(port, () => {
        console.log(`I'm listening to port ${port}`)   
    })