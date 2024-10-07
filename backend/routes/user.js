const express = require('express')
const userRoute = express.Router()

userRoute.get('/user', (req, res) => {
    res.json({"message":"getting all users!"})
})

userRoute.get('/user:id', (req, res) => {
    res.json({"message":"getting selected user!"})
})

userRoute.post('/user', (req, res) => {
    res.json({"message":"post new user!"})
})

userRoute.delete('/user:id', (req, res) => {
    res.json({"message":"deleting selected user!"})
})

userRoute.patch('/user:id', (req, res) => {
    res.json({"message":"updating selected user!"})
})

module.exports = userRoute
