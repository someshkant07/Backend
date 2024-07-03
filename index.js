require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/twitter' , (req, res) => {
    res.send("hiteshdotcom")
})

app.get('/login' , (req, res) => {
    res.send('<h1>please login at code with somesh </h1>')
})

app.get('/travel', (req, res) => {
    res.send('<h1> travel for your life</h1>')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})