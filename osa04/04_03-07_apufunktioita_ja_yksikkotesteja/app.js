const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const blogsRouter = require('./controllers/blogs')
//const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)

module.exports = app