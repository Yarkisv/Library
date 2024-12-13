const express = require('express')
const router = express.Router()
const {
    insertUser,
    checkUser,
    selectBooks,
    addBook,
    removeBook
} = require('./functions')
const connection = require('./db_config')

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

    const { username, password, role } = req.body

    const user = {
        username: username,
        password: password,
        role: role,
    }

    insertUser(user, res)
})

router.post('/add-book', (req, res) => {
    const {title, author, description} = req.body

    const book = {
        title,
        author,
        description
    }

    addBook(book, res)
})

router.post('/remove-book', (req, res) => {
    const {title, author} = req.body

    removeBook(title, res)
})

module.exports = router