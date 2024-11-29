const express = require('express')
const mysql = require('mysql2')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false}))

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "library",
    password: "077604"
})

let userRole = ''

connection.connect((err) => {
    if (err) {
        return console.error("Ошибка: " + err.message)
    }
    else{
        console.log("\nПодключение к серверу MySQL успешно установлено\n")
    }
})

app.get('/', (req, res) => {
    res.render("main-page")
})

app.get('/login-page', (req, res) => {
    res.render("login-page")
})

app.get('/sign-in-page', (req, res) => {
    res.render("sign-in-page")
})

app.get('/login', (req, res) => {
    res.render("login-page")
})

app.get('/sign-in', (req, res) => {
    res.render("sign-in-page")
})

app.post('/sign-in', (req, res) => {
    console.log(req.body)

    const { username, password, role } = req.body
    const query = 'INSERT INTO users (username, user_password, user_role) VALUES (?, ?, ?)'

    userRole = role
    console.log(userRole)

    connection.execute(query, [username, password, role], (err, responce) => {
        if (err) {
            console.error('Database error:', err)
        }
        else {
            console.log("Inserterd data: ", responce)

            res.redirect('/books-page')
        }
    })
})

app.post('/login', (req, res) => {
    console.log(req.body)

    const { username, password} = req.body

    const query = `SELECT * FROM users WHERE user_password = ${password}`

    connection.execute(query, (err, results) => {
        if (err) {
            console.log(err, ` User with password: ${password} dont exists`)

            res.redirect('/login')
        }
        else {
            console.log(`User with password: ${password} exists`)

            res.redirect('/books-page')
        }
    })
})

app.get('/books-page', (req, res) => {

    connection.execute("SELECT * FROM books", (err, results, fields) => {
        if (err) {
            console.error("Ошибка выполнения запроса:", err)
            return;
        }
    
        const newBook = results.map(row => ({
            title: row.title,
            author: row.author,
            description: row.description
        }))

        // console.log(newBook)
        res.render('books-page', { newBook: newBook, role: userRole})
    })
})

app.post('/add-book', (req, res) => {
    const { title, author, description } = req.body

    const query = 'INSERT INTO books (title, author, description) VALUES (?, ?, ?)'

    connection.execute(query, [title, author, description], (err, responce) => {
        if (err) {
            console.error('Database error:', err)
        }
        else {
            console.log("Inserterd data: ", responce)

            res.redirect('/books-page')
        }
    })
})

app.post("/remove-book", (req, res) => {
    const { title, description } = req.body

    const quary = `DELETE FROM books WHERE title = "${title}"`

    connection.execute(quary, (err, responce) => {
        if (err) {
            console.error('Database error:', err)
        }
        else {
            console.log("Inserterd data: ", responce)

            res.redirect('/books-page')
        }
    })
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})