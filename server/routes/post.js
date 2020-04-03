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
      const sql2 = `INSERT INTO user (email, fname, lname, fam_id, cell_phone, password, salt, avatar) VALUES (?, ?, ?, ?, ?, ?, ?, "user")`

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

router.post("/invite", (req, res, next) => {
  const fname = req.body.firstName
  const lname = req.body.lastName
  const jurn_id = req.body.jurn_id

  const sqlUser_id = `SELECT user.user_id
  FROM user
  WHERE fname = ? AND lname = ?`
  conn.query(
    sqlUser_id,
    [fname, lname],
    (errUser_id, resultsUser_id, fieldsUser_id) => {
      const user_id = resultsUser_id[0].user_id

      const sqlInvite = `INSERT INTO invite
      (jurn_id, user_id, inv_status)
      VALUES
      (?, ?, "pending")`
      conn.query(
        sqlInvite,
        [jurn_id, user_id],
        (errInvite, resultsInvite, fieldsInvite) => {
          res.json({
            message: "pending invite"
          })
        }
      )
    }
  )
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
        const sqlGetJurn_id = `SELECT jurn_id FROM jurn WHERE jname = ?`
        const jurn_id = results4.insertId
        const sqlLinks = `INSERT INTO link (user_id, jurn_id) VALUES (?, ?)`
        conn.query(
          sqlLinks,
          [user_id, jurn_id],
          (errLinks, resultsLinks, fieldsLinks) => {
            const sqlStart = `INSERT INTO invite
            (jurn_id, user_id, inv_status)
            VALUES(?,?,"accepted")`
            conn.query(
              sqlStart,
              [jurn_id, user_id],
              (errStart, resultsStart, fieldStart) => {
                res.json({
                  message: "jurn added successfully",
                  id: jurn_id
                })
              }
            )
          }
        )
      })
    }
  })
})

router.post("/phase1", (req, res, next) => {
  const date = req.body.date.split(",")
  const startDate = date[0]
  const endDate = date[1]
  const jurn_id = req.body.jurn_id
  const location = req.body.location
  const hotel = req.body.hotel

  const sqlJurnPost = "SELECT rems_status FROM jurn WHERE jurn_id = ?"
  conn.query(
    sqlJurnPost,
    [jurn_id],
    (errJurnPost, resultsJurnPost, fieldsJurnPost) => {
      if (resultsJurnPost[0].rems_status == "posted") {
        const sqlUpdateJurn = `UPDATE jurn SET location = ?, hotel = ?, start_date = ?, end_date = ? WHERE jurn_id = ?`

        conn.query(
          sqlUpdateJurn,
          [location, hotel, startDate, endDate, jurn_id],
          (errUpJurn, resultsUpJurn, fieldsUpJurn) => {
            res.json({
              message: "location, hotel, dates updated"
            })
          }
        )
      } else {
        const sqlR = `INSERT INTO reminder (rem, status, jurn_id)
      VALUES
          ("Alert your credit card company", "active", ?),
          ("Contact your cell phone company","active", ?),
          ("Notify your home security system operator","active", ?),
          ("Confirm all reservations","active", ?),
          ("Make advance payments on bills that have due dates during your trip","active", ?),
          ("Check the weather","active", ?),
          ("Eat, throw out, or give away any perishable food","active", ?),
          ("Leave an itinerary with a friend or family member","active", ?),
          ("Place a hold on your mail delivery","active", ?),
          ("Bring in outdoor furniture","active", ?)`
        conn.query(
          sqlR,
          [
            jurn_id,
            jurn_id,
            jurn_id,
            jurn_id,
            jurn_id,
            jurn_id,
            jurn_id,
            jurn_id,
            jurn_id,
            jurn_id
          ],
          (errR, resultsR, fieldsR) => {
            const sqlUpdateJurn = `UPDATE jurn SET location = ?, hotel = ?, start_date = ?, end_date = ?, rems_status = "posted"  WHERE jurn_id = ?`

            conn.query(
              sqlUpdateJurn,
              [location, hotel, startDate, endDate, jurn_id],
              (errUpJurn, resultsUpJurn, fieldsUpJurn) => {
                res.json({
                  message: "location, hotel, dates updated and reminders added"
                })
              }
            )
          }
        )
      }
    }
  )
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
        res.json({
          message: "family added successfully"
        })
      })
    }
  })
})

router.post("/location", (req, res, next) => {
  const loc_name = req.body.location
  const jurn_id = req.body.jurn_id
  const sql8 = "INSERT INTO location (loc_name, jurn_id) VALUES (?, ?)"

  conn.query(sql8, [loc_name, jurn_id], (err8, results8, fields8) => {
    res.json({
      message: "location added successfully"
    })
  })
})

router.post("/hotel", (req, res, next) => {
  const hotel_name = req.body.hotel
  const jurn_id = req.body.jurn_id
  const sql8 = "INSERT INTO hotel (hotel_name, jurn_id) VALUES (?, ?)"

  conn.query(
    sql8,
    [hotel_name, jurn_id],
    (errHot2, resultsHot2, fieldsHot2) => {
      res.json({
        message: "hotel added successfully"
      })
    }
  )
})

router.post("/dates", (req, res, next) => {
  const start_date = req.body.date[0]
  const end_date = req.body.date[1]
  const jurn_id = req.body.jurn_id
  const sqlDateRange =
    "INSERT INTO date (start_date, end_date, jurn_id) VALUES (?, ?, ?)"

  conn.query(
    sqlDateRange,
    [start_date, end_date, jurn_id],
    (errDateRange, resultsDateRange, fieldsDateRange) => {
      res.json({
        message: "dates added successfully"
      })
    }
  )
})

router.post("/addrem", (req, res, next) => {
  const jurn_id = req.body.jurn_id
  const rem = req.body.reminder
  const sqlAddRem = `INSERT INTO reminder (rem, jurn_id) VALUES (?, ?)`
  conn.query(
    sqlAddRem,
    [rem, jurn_id],
    (errAddrem, resultsAddRem, fieldsAddRem) => {
      res.json({
        message: "rem added successfully"
      })
    }
  )
})

router.post("/addact", (req, res, next) => {
  const jurn_id = req.body.jurn_id
  const act = req.body.activity
  const sqlAddact = `INSERT INTO activity (act, jurn_id) VALUES (?, ?)`
  conn.query(
    sqlAddact,
    [act, jurn_id],
    (errAddact, resultsAddact, fieldsAddact) => {
      res.json({
        message: "act added successfully"
      })
    }
  )
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

// const invitee_id = resultsInvite.insertId
// const sqlLinkUp = `UPDATE link
// SET invitee_id = ?
// WHERE user_id = ? AND jurn_id = ?`
// conn.query(
//   sqlLinkUp,
//   [invitee_id, user_id, jurn_id],
//   (errLinkUp, resultsLinkUp, fieldsLinkUp) => { })
