require('dotenv').config()

const express = require('express')
const appRoutes = require('./routes/routes.js')
const app = express()

//middleware
app.use(express.json())
app.use((req, res, next) =>{
  console.log(req.path, req.method)
  next()
})

//routes
app.use('/api',appRoutes)

//server
app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`)
})