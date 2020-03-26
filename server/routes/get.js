const express = require("express")
const router = express.Router()
const conn = require("../db")
const decode = require("jsonwebtoken").decode
router.get("/dashboard", (req, res, next) => {
  const profile = decode(req.headers.authorization.substring(7))
  // working on Postman

  const dashResults = {}
  //trying email filter
  const email = profile.email
  const sql =
    //working on new dashboard
    `SELECT
view.id, view.jname, view.loc_name, view.user_id, user.fname, user.lname, user.fam_id, family.fam_name, user.email, user.cell_phone
FROM
((SELECT
  jurn.jname, location.loc_name, jurn.user_id, jurn.id
  FROM
  jurn
  LEFT JOIN location ON jurn.jname = location.jname) as VIEW
    LEFT JOIN user ON view.user_id = user.id)
    LEFT JOIN family ON family.id = user.fam_id
    WHERE email = ?`
  conn.query(sql, [email], (err, results, fields) => {
    dashResults.jurn = results

    const sql2 = `SELECT user.id, user.email, user.fname, user.lname, user.fam_id, user.cell_phone
      FROM user
      WHERE user.email = ?`
    conn.query(sql2, [email], (err2, results2, fields2) => {
      dashResults.user = results2[0]
      //needs to be fixed
      jurn_id = "1"
      const sql3 = `SELECT rem
      FROM reminder
      WHERE jurn_id = ?`
      conn.query(sql3, [jurn_id], (err3, results3, fields3) => {
        dashResults.rem = results3
        res.json({ dashboard: dashResults })
      })
    })
  })
})

router.get("/location", (req, res, next) => {
  console.log(req.body.jname)
  const jname = req.body.jname
  const sqlL = "SELECT loc_name FROM location WHERE jname = ?"
  conn.query(sqlL, [jname], (errL, resultsL, fieldsL) => {
    console.log(resultsL)
    res.json(resultsL)
  })
})
module.exports = router
