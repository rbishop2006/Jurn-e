const express = require("express")
const router = express.Router()
const sha512 = require("js-sha512")
const jwt = require("jsonwebtoken")
const config = require("config")
const conn = require("../db")
const randomString = require("../utils/randomstring.js")

router.post("/register", (req, res, next) => {
  const email = req.body.username
  const fname = req.body.fname
  const lname = req.body.lname
  const fam_id = req.body.fam_id
  const cell_phone = req.body.cell_phone
  const salt = randomString(20)
  const password = sha512(req.body.password + salt)

  const checkSQL1 = "SELECT count(1) as count FROM user WHERE email = ?"

  conn.query(checkSQL1, [email], (err1, results1, fields1) => {
    if (results1[0].count > 0) {
      res.status(409).json({
        message: "email already exists",
      })
    } else {
      const sql2 = `INSERT INTO user (email, fname, lname, fam_id, cell_phone, password, salt, avatar) VALUES (?, ?, ?, ?, ?, ?, ?, "user")`

      conn.query(
        sql2,
        [email, fname, lname, fam_id, cell_phone, password, salt],
        (err2, results2, fields2) => {
          res.json({
            message: "user added successfully",
          })
        }
      )
    }
  })
})

router.post("/register/family", (req, res, next) => {
  const fam_name = req.body.fam_name

  const checkSQL5 = "SELECT count(1) as count FROM family WHERE fam_name = ?"

  conn.query(checkSQL5, [fam_name], (err5, results5, fields5) => {
    if (results5[0].count > 0) {
      res.status(409).json({
        message: "family already exists",
      })
    } else {
      const sql6 = "INSERT INTO family (fam_name) VALUES (?)"

      conn.query(sql6, [fam_name], (err6, results6, fields6) => {
        res.json({
          message: "family added successfully",
        })
      })
    }
  })
})

// LOGIN USERS BELOW
router.post("/login", (req, res, next) => {
  const email = req.body.username
  const password = req.body.password
  const getSQL = "SELECT email, salt, password FROM user WHERE email = ?"

  conn.query(getSQL, [email], (salterr, saltresults, saltfields) => {
    if (saltresults.length > 0) {
      const salt = saltresults[0].salt
      const userpass = saltresults[0].password

      if (sha512(password + salt) === userpass) {
        //log them in

        const token = jwt.sign(
          {
            email: email,
            project: "Jurn-e",
          },
          config.get("secret")
        )
        res.json({
          token: token,
        })
      } else {
        res.status(401).json({
          message: "Invalid email or password",
        })
      }
    } else {
      res.status(401).json({
        message: "Invalid email or password",
      })
    }
  })
})

module.exports = router

// const invitee_id = resultsInvite.insertId
// const sqlLinkUp = `UPDATE link
// SET invitee_id = ?
// WHERE user_id = ? AND jurn_id = ?`
// conn.query(
//   sqlLinkUp,
//   [invitee_id, user_id, jurn_id],
//   (errLinkUp, resultsLinkUp, fieldsLinkUp) => { })
