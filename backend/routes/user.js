const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.get("/", authenticateToken, async (req, res) => {
    try {
        console.log(req.user)
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.post('/login', async (req, res) => {
    const existingUser = await User.findOne({ username: req.body.username })

    if (existingUser) {
        try {
            if (await bcrypt.compare(req.body.password, existingUser.password)) {
                const accessToken = generateAccessToken(existingUser.toJSON())
                res.json({ accessToken })
            } else {
                res.json({ message: "not allowed" })
            }
        } catch {
            res.status(500).send()
        }
    } else {
        res.json({ message: "User doesm't exist!" })
    }
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' })
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err){
            console.log(err)
            return res.sendStatus(403)
        } 
            
        req.user = user
        next()
    })
}

module.exports = router