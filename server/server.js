const express = require('express');
const app = express()

const colors = require('colors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')
const cors = require('cors')

require('./config/config');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())

app.use(cors())

app.use(require('./routes/index'))

mongoose.connect(process.env.urlDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
    if (err) {
        console.log('Error en la base de datos'.red)
        console.log(err)
    }

    console.log('Conectado en la base de datos'.green)
});


app.listen(process.env.PORT, () => {
    console.log("Servidor en el puerto:", process.env.PORT.green)
})