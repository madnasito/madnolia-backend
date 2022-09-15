const express = require('express')
const app = express()
const { createUser, getUserInfo, updateUser, verifyUser } = require('../controllers/user')
const { verifyToken } = require('../middleware/autentication')
const { check } = require('express-validator')
const { validFields } = require('../middleware/valid_fields')

app.post('/signin', [
    check('name', 'The name is required').not().isEmpty(),
    check('username', 'The username is required').not().isEmpty(),
    check('email', 'The email is required').not().isEmpty(),
    check('password', 'The password is required').not().isEmpty(),
    validFields
], createUser)

app.get('/user_info', verifyToken, getUserInfo)

app.put('/update_user', verifyToken, updateUser)

app.post('/verify_user/:username/:email', verifyUser)

module.exports = app