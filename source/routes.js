const express = require('express')
const router = express.Router()
const {
    insertUser,
    checkUser,
    selectBooks,
    addBook,
    removeBook
} = require('./functions')
const User = require('../models/user_model')
const Book = require('../models/book_model')

let userRole = ''

router.get('/', (req, res) => {
    res.render("main-page")
})

router.get('/login-page', (req, res) => {
    res.render("login-page")
})

router.get('/sign-in-page', (req, res) => {
    res.render("sign-in-page")
})

router.get('/login', (req, res) => {
    res.render("login-page")
})

router.get('/sign-in', (req, res) => {
    res.render("sign-in-page")
})

router.get('/home', (req, res) => {
    res.redirect("books-page")
})

router.get('/book-info', (req, res) => {
    res.render("book-info")
})

router.get('/books-page', (req, res) => {

    selectBooks(res)
})

router.post('/login', (req, res) => {
    console.log(req.body)

    const { username, password} = req.body

    checkUser(password, res)
})

router.post('/sign-in', (req, res) => {
    console.log(req.body)

    const newUser = new User (req.body.username, req.body.password, req.body.role)

    insertUser(newUser, res)
})

router.post('/add-book', (req, res) => {
    console.log(req.body)

    const newBook = new Book (req.body.title, req.body.author, req.body.bookStatus, req.body.description)

    addBook(newBook, res)
})

router.post('/remove-book', (req, res) => {
    const title = req.body

    removeBook(title, res)
})

module.exports = router