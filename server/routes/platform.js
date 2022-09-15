const express = require('express')
const Platform = require('../models/platform')
const app = express()

app.post('/platform', (req, res) => {

    const body = req.body

    const platform = new Platform({
        name: body.name,
        api_id: body.api_id,
        ico: body.ico,
        category: body.category
    })

    platform.save((err, platformDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            platformDB
        })
    })
})

module.exports = app