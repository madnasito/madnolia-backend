const express = require('express')
const app = express()
const { verifyToken } = require('../middleware/autentication')
const { createMatch, editMatch, deleteMatch } = require('../controllers/match')

app.post('/match', verifyToken, createMatch)
app.put('/edit_match', verifyToken, editMatch)
app.put('/delete_match', verifyToken, deleteMatch)

module.exports = app