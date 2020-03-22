const express = require("express")
const router = express.Router()
const conn = require("../db")

router.get("/dashboard", (req, res, next) => {
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
    res.json(results)
  })
})

module.exports = router
