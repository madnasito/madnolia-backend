const express = require('express')
const app = express()
const { createUser, getUserInfo, updateUser, verifyUser } = require('../controllers/user')
const { verifyToken } = require('../middleware/autentication')

app.post('/signin', createUser)

app.get('/user_info', verifyToken, getUserInfo)

app.post('/update_user', verifyToken, updateUser)

app.post('/verify_user/:username/:email', verifyUser)

module.exports = app