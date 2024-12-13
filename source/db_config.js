const mysql = require('mysql2')
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

connection.connect((err) => {
    if (err) {
        return console.error("Ошибка: " + err.message)
    }
    else{
        console.log("\nПодключение к серверу MySQL успешно установлено\n")
    }
})

module.exports = connection