const express = require('express');
const colors = require('colors')
require('./config/config')

const app = express()

app.listen(3000, ()=>{
	console.log("Servidor en el puerto:", process.env.PORT.green)
})

