require('dotenv').config()

const express = require('express')
const appRoutes = require('./routes/routes.js')
const app = express()
const mongoose = require('mongoose')

//middleware
app.use(express.json())
app.use((req, res, next) =>{
  console.log(req.path, req.method)
  next()
})

//routes
app.use('/api',appRoutes)

//connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`app connected with mongo and listening on port ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
