const express = require('express')
const app = express()

app.use(require('./user'))
app.use(require('./match'))
app.use(require('./auth'))

module.exports = app