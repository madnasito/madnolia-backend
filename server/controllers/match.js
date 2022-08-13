const Match = require('../models/match')
const _ = require('underscore')
const User = require('../models/user')

const createMatch = (req, res) => {

    const body = req.body

    const match = new Match({
        game: body.game,
        platform: body.platform,
        date: body.date,
        user: req.user,
        message: body.message,
        img: body.img
    })

    // Verificar que la fecha no sea mayor de 2 semanas

    match.save((err, matchDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        User.findByIdAndUpdate(req.user, { $push: { 'matches': matchDB._id } }, (err) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
        })

        res.json({
            ok: true,
            matchDB
        })
    })

}

const editMatch = async(req, res) => {
    const uid = req.user
    const matchId = req.body._id

    try {

        const matchDB = await Match.findById(matchId)

        if (matchDB.user != uid) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Unauthorized"
                }
            })
        }

        // Updating Match
        let body = _.pick(req.body, ['name', 'platform', 'date', 'game', 'img'])

        Match.findByIdAndUpdate(matchId, body, { new: true }, (err, updatedMatch) => {
            // Verify Errors
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            // Match Updated
            res.json({
                ok: true,
                updatedMatch,
                message: 'Match updated!'
            })
        })

    } catch (error) {

    }
}

const deleteMatch = async(req, res) => {
    const uid = req.user
    const matchId = req.body._id

    const matchDB = await Match.findById(matchId)

    if (matchDB.user != uid) {
        return res.status(401).json({
            ok: false,
            err: {
                message: "Unauthorized"
            }
        })
    }

    Match.findByIdAndDelete(matchId, {}, (err, deletedMatch) => {
        // Verify Errors
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        // Match Updated
        res.json({
            ok: true,
            message: 'Match deleted'
        })
    })
}

module.exports = { createMatch, editMatch, deleteMatch }