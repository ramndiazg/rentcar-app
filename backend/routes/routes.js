const express = require('express')
const router = express.Router()


//routes
router.get('/', (req, res) => {
    res.json({"message":"Hello World!"})
})


//user routes
router.get('/user', (req, res) => {
    res.json({"message":"getting all users!"})
})

router.get('/user:id', (req, res) => {
    res.json({"message":"getting selected user!"})
})

router.post('/user', (req, res) => {
    res.json({"message":"post new user!"})
})

router.delete('/user:id', (req, res) => {
    res.json({"message":"deleting selected user!"})
})

router.patch('/user:id', (req, res) => {
    res.json({"message":"updating selected user!"})
})


//client routes
router.get('/client', (req, res) => {
    res.json({"message":"getting all clients!"})
})

router.get('/client:id', (req, res) => {
    res.json({"message":"getting selected client!"})
})

router.post('/client', (req, res) => {
    res.json({"message":"post new client!"})
})

router.delete('/client:id', (req, res) => {
    res.json({"message":"deleting selected client!"})
})

router.patch('/client:id', (req, res) => {
    res.json({"message":"updating selected client!"})
})


//vehicle routes
router.get('/vehicle', (req, res) => {
    res.json({"message":"getting all vehicles!"})
})

router.get('/vehicle:id', (req, res) => {
    res.json({"message":"getting selected vehicle!"})
})

router.post('/vehicle', (req, res) => {
    res.json({"message":"post new vehicle!"})
})

router.delete('/vehicle:id', (req, res) => {
    res.json({"message":"deleting selected vehicle!"})
})

router.patch('/vehicle:id', (req, res) => {
    res.json({"message":"updating selected vehicle!"})
})



module.exports = router
