require('dotenv').config()
import mysql from 'mysql'

export default mysql.createConnection({
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})
