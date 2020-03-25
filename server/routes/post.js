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
        message: "email already exists"
      })
    } else {
      const sql2 =
        "INSERT INTO user (email, fname, lname, fam_id, cell_phone, password, salt) VALUES (?, ?, ?, ?, ?, ?, ?)"

      conn.query(
        sql2,
        [email, fname, lname, fam_id, cell_phone, password, salt],
        (err2, results2, fields2) => {
          res.json({
            message: "user added successfully"
          })
        }
      )
    }
  })
})

router.post("/jurn", (req, res, next) => {
  const jname = req.body.jname
  const user_id = req.body.user_id

  const checkSQL3 = "SELECT count(1) as count FROM jurn WHERE jname = ?"

  conn.query(checkSQL3, [jname], (err3, results3, fields3) => {
    if (results3[0].count > 0) {
      res.status(409).json({
        message: "jurn already exists"
      })
    } else {
      const sql4 = "INSERT INTO jurn (jname, user_id) VALUES (?, ?)"

      conn.query(sql4, [jname, user_id], (err4, results4, fields4) => {
        res.json({
          message: "jurn added successfully"
        })
      })
    }
  })
})

router.post("/register/family", (req, res, next) => {
  const fam_name = req.body.fam_name

  const checkSQL5 = "SELECT count(1) as count FROM family WHERE fam_name = ?"

  conn.query(checkSQL5, [fam_name], (err5, results5, fields5) => {
    if (results5[0].count > 0) {
      res.status(409).json({
        message: "family already exists"
      })
    } else {
      const sql6 = "INSERT INTO family (fam_name) VALUES (?)"

      conn.query(sql6, [fam_name], (err6, results6, fields6) => {
        console.log(req.body)

        res.json({
          message: "family added successfully"
        })
      })
    }
  })
})

router.post("/location", (req, res, next) => {
  const loc_name = req.body.location
  const jname = req.body.jname

  const checkSQL7 = "SELECT count(1) as count FROM location WHERE loc_name = ?"

  conn.query(checkSQL7, [loc_name], (err7, results7, fields7) => {
    if (results7[0].count > 0) {
      res.status(409).json({
        message: "location already exists"
      })
    } else {
      const sql8 = "INSERT INTO location (loc_name, jname) VALUES (?, ?)"

      conn.query(sql8, [loc_name, jname], (err8, results8, fields8) => {
        console.log(req.body)

        res.json({
          message: "location added successfully"
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
            // fname: fname,
            // lname: lname,
            email: email,
            // cell_phone: cell_phone,
            project: "Jurn-e"
          },
          config.get("secret")
        )
        res.json({
          token: token
        })
      } else {
        res.status(401).json({
          message: "Invalid email or password"
        })
      }
    } else {
      res.status(401).json({
        message: "Invalid email or password"
      })
    }
  })
})

module.exports = router
