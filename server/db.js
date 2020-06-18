const mysql = require("mysql")
const config = require("config")

const pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.host || config.get("db.host"),
	user: process.env.user || config.get("db.user"),
	password: process.env.password || config.get("db.password"),
	database: process.env.database || config.get("db.database"),
	secret: process.env.secret,
})

// const pool = mysql.createPool({
//   connectionLimit: 25,
//   host: config.get("db.host"),
//   user: config.get("db.user"),
//   password: config.get("db.password"),
//   database: config.get("db.database")
// })
module.exports = pool
