const express = require('express')
const app = express()

app.use(require('./user'))
app.use(require('./match'))
app.use(require('./auth'))
app.use(require('./platform'))

module.exports = app