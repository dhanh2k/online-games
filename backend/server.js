const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/onlinewebgames')

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to Database"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const userRouter = require('./routes/user')

app.use("/user", userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})