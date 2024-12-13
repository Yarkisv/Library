const express = require('express')
const mysql = require('mysql2')
const routes = require('./routes.js')
const app = express()

require('dotenv').config()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false}))
app.use('/', routes)

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})