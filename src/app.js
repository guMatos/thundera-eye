const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' })

const app = express()
const PORT = process.env.PORT
const MONGOURL = process.env.MONGOURL

mongoose.connect(MONGOURL)
mongoose.Promise = global.Promise
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(require('./routes/router'))

app.listen(PORT, () => console.log('App is running at local port ' + PORT))