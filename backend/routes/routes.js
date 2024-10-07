const express = require('express')
const router = express.Router()

//routes
router.get('/', (req, res) => {
    res.json({"message":"Hello World!"})
})

router.get('/dashboard', (req, res) => {
    res.json({"message":"welcome to dashboard!"})
})

module.exports = router
