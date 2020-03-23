const express = require("express")
const router = express.Router()
const conn = require("../db")

router.get("/dashboard", (req, res, next) => {
  const dashResults = {}
  const sql = `SELECT
view.jname, view.loc_name, view.user_id, user.fname, user.lname, user.fam_id, family.fam_name, user.email, user.cell_phone
FROM
((SELECT
  jurn.jname, location.loc_name, jurn.user_id
  FROM
  jurn
  LEFT JOIN location ON jurn.jname = location.jname) as VIEW
    LEFT JOIN user ON view.user_id = user.id)
    LEFT JOIN family ON family.id = user.fam_id`
  conn.query(sql, (err, results, fields) => {
    dashResults.jurn = results
    const email = `${profile.email}`

    const sql2 = `SELECT user.id, user.email, user.fname, user.lname, user.fam_id, user.cell_phone
      FROM user
      WHERE user.email = ?`
    conn.query(sql2, [email], (err2, results2, fields2) => {
      dashResults.user = results2
      res.json({ dashboard: dashResults })
    })
  })
})
module.exports = router
