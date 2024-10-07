const express = require('express')
const clientRoute = express.Router()

clientRoute.get('/client', (req, res) => {
    res.json({"message":"getting all clients!"})
})

clientRoute.get('/client:id', (req, res) => {
    res.json({"message":"getting selected client!"})
})

clientRoute.post('/client', (req, res) => {
    res.json({"message":"post new client!"})
})

clientRoute.delete('/client:id', (req, res) => {
    res.json({"message":"deleting selected client!"})
})

clientRoute.patch('/client:id', (req, res) => {
    res.json({"message":"updating selected client!"})
})

module.exports = clientRoute
