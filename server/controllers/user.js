const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const _ = require('underscore')
const e = require('express')

const createUser = async(req, res) => {

    const body = req.body;

    let user = new User({
        name: body.name,
        username: body.username.toLowerCase(),
        email: body.email,
        password: body.password,
        platforms: body.platforms
    })

    user.password = bcrypt.hashSync(user.password, 10)

    user.save((err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        // Create Token for new User
        let token = jwt.sign({ user: userDB._id }, process.env.SEED, { expiresIn: process.env.END_TOKEN })

        res.json({
            ok: true,
            userDB,
            token
        })
    })

}

const getUserInfo = async(req, res) => {

    let user = await User.findById(req.user)

    // Create Token the user again
    let token = jwt.sign({ user: user._id }, process.env.SEED, { expiresIn: process.env.END_TOKEN })

    res.json({
        ok: true,
        name: user.name,
        email: user.email,
        username: user.username,
        platforms: user.platforms,
        games: user.games,
        token
    })

}

const verifyUser = async(req, res) => {

    const username = req.params.username.toLowerCase()
    const email = req.params.email

    const userExists = await User.findOne({ username })
    const emailExists = await User.findOne({ email })


    if (userExists) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Use another username'
            }
        })
    } else if (emailExists) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'An user is using this email'
            }
        })
    } else {
        return res.status(200).json({
            ok: true
        })
    }

}

const updateUser = async(req, res) => {

    // Validate Token

    const uid = req.user

    try {

        const userDB = await User.findById(uid)

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: "The user does not exists"
                }
            })
        }

        // Updating user
        let body = _.pick(req.body, ['name', 'email', 'username'])

        //Modify User
        User.findByIdAndUpdate(uid, body, { new: true }, (err, userUpdated) => {

            // Verify Errors
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            // Create Token for new User
            let token = jwt.sign({ user: userUpdated._id }, process.env.SEED, { expiresIn: process.env.END_TOKEN })

            // User Updated
            res.json({
                ok: true,
                name: userUpdated.name,
                email: userUpdated.email,
                username: userUpdated.username,
                token,
                message: 'User Updated'
            })

        })

    } catch (error) {

    }
}

module.exports = {
    createUser,
    getUserInfo,
    updateUser,
    verifyUser
}