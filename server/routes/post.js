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
        const sqlGetJurn_id = `SELECT jurn_id FROM jurn WHERE jname = ?`
        const jurn_id = results4.insertId
        const sqlLinks = `INSERT INTO link (user_id, jurn_id) VALUES (?, ?)`
        conn.query(
          sqlLinks,
          [user_id, jurn_id],
          (errLinks, resultsLinks, fieldsLinks) => {
            res.json({
              message: "jurn added successfully",
              id: jurn_id
            })
          }
        )
      })
    }
  })
})

router.post("/phase1", (req, res, next) => {
  const jurn_id = req.body.jurn_id
  const location = req.body.location
  const hotel = req.body.hotel

  const sqlJurnPost = "SELECT rems_status FROM jurn WHERE jurn_id = ?"
  conn.query(
    sqlJurnPost,
    [jurn_id],
    (errJurnPost, resultsJurnPost, fieldsJurnPost) => {
      console.log(resultsJurnPost[0].rems_status)
      if (resultsJurnPost[0].rems_status == "posted") {
        const sqlUpdateJurn = `UPDATE jurn SET location = ?, hotel = ? WHERE jurn_id = ?`

        conn.query(
          sqlUpdateJurn,
          [location, hotel, jurn_id],
          (errUpJurn, resultsUpJurn, fieldsUpJurn) => {
            res.json({
              message: "location, hotel updated"
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
            // const rems_status = "posted"
            const sqlUpdateJurn = `UPDATE jurn SET location = ?, hotel = ?,rems_status = "posted"  WHERE jurn_id = ?`

            conn.query(
              sqlUpdateJurn,
              [location, hotel, jurn_id],
              (errUpJurn, resultsUpJurn, fieldsUpJurn) => {
                res.json({
                  message: "location, hotel updated and reminders added"
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

  const checkSQL7 = "SELECT count(1) as count FROM location WHERE loc_name = ?"

  conn.query(checkSQL7, [loc_name], (err7, results7, fields7) => {
    const sql8 = "INSERT INTO location (loc_name, jurn_id) VALUES (?, ?)"

    conn.query(sql8, [loc_name, jurn_id], (err8, results8, fields8) => {
      res.json({
        message: "location added successfully"
      })
    })
  })
})

router.post("/hotel", (req, res, next) => {
  const hotel_name = req.body.hotel
  const jurn_id = req.body.jurn_id

  const checkSQLHot = "SELECT count(1) as count FROM hotel WHERE hotel_name = ?"

  conn.query(checkSQLHot, [hotel_name], (errHot, resultsHot, fieldsHot) => {
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
})

router.post("/addrem", (req, res, next) => {
  const jurn_id = req.body.jurn_id
  const rem = req.body.item
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

router.patch("/remcomplete", (req, res, next) => {
  const rem_id = req.body.rem_id

  const sqlremComplete = `UPDATE reminder SET status = "completed" WHERE rem_id = ?`

  conn.query(
    sqlremComplete,
    [rem_id],
    (errremComplete, resultsremComplete, fieldsremComplete) => {
      res.json({
        message: "status updated to completed"
      })
    }
  )
})

router.patch("/reminder", (req, res, next) => {
  const rem_id = req.body.rem_id
  const status = req.body.status

  const sqlToggleRem = `UPDATE reminder SET status = ? WHERE rem_id = ?`

  conn.query(
    sqlToggleRem,
    [status, rem_id],
    (errToggleRem, resultsToggleRem, fieldsToggleRem) => {
      res.json({
        message: "status updated"
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
