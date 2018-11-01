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


// const router... = require('./routes/...')
const newsRouter = require('./routes/news')

app
    .use(express.urlencoded({ extended:false }))
    .use(express.json())
    .use(cors())

    // .use('/', router...)
    .use('/news', newsRouter)


    .listen(port, () => {
        console.log(`I'm listening to port ${port}`)   
    })