const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

mongoose.set('useFindAndModify', false)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true })
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app