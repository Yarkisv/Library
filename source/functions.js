const connection = require('./db_config')

let userRole = ''

const insertUser = (user, res) => {
    const query = 'INSERT INTO users (username, user_password, user_role) VALUES (?, ?, ?)'

    connection.query(query, [user.username, user.password, user.role], (err, responce) => {
        if (err) {
            console.error('Database error:', err)
        }
        else {
            console.log("Inserterd data:\n", user)
            userRole = user.role
        }

        res.redirect('/books-page')
    })
}

const checkUser = (password, res) => {
    const query = `SELECT * FROM users WHERE user_password = ${password}`

    connection.query(query, (err, results) => {
        if (err) {
            console.log(err, `User with password: ${password} dont exists`)

            res.redirect('/login')
        }
        else {
            console.log(`User with password: ${password} exist`)

            results.forEach(user => {
                userRole = user.user_role
                console.log(`User role is: ${userRole}`)
            })

            res.redirect('/books-page')
        }
    })
}

const selectBooks = (res) => {
    const query = 'SELECT * FROM books'
    let books = ''

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Ошибка выполнения запроса:", err)
        }

        books = results.map(row => ({
            id: row.book_id,
            title: row.title,
            author: row.author,
            status: row.book_status,
            description: row.description
        }))
        res.render('books-page', {newBook: books, role: userRole})
    })    
}

const addBook = (book, res) => {
    const query = 'INSERT INTO books (title, author, book_status, description) VALUES (?, ?, ?, ?)'

    connection.query(query, [book.title, book.author, book.bookStatus, book.description], (err, responce) => {
        if (err) {
            console.error(err)
        }
        else {
            res.redirect('/books-page')
        }
    })
}

const removeBook = (title, res) => {
    const query = `DELETE FROM books WHERE title = "${title}"`

    connection.query(query, (err, responce) => {
        if (err) {
            console.error(err)
        }
        else {
            console.log(`Book with title ${title} deleted from db`)

            res.redirect('books-page')
        }
    })
}

module.exports = {
    insertUser,
    checkUser,
    selectBooks,
    addBook,
    removeBook
}