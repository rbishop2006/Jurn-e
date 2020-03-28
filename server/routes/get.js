const express = require("express")
const router = express.Router()
const conn = require("../db")
const decode = require("jsonwebtoken").decode

router.get("/dashboard", (req, res, next) => {
  const profile = decode(req.headers.authorization.substring(7))
  // working on Postman

  const dashResults = {
    jurns: [],
    user: {}
  }
  //trying email filter
  const email = profile.email
  const sqlId = `SELECT user_id
  FROM user
  WHERE email = ?`

  conn.query(sqlId, [email], (errId, resultsId, fieldsId) => {
    const user_id = resultsId[0].user_id
    //trying mikes codes

    const sql = `SELECT jurn.jurn_id, jurn.jname, jurn.location, jurn.user_id, user.fname, user.lname, user.fam_id, user.email, user.cell_phone, family.fam_name, reminder.rem
    FROM jurn
    LEFT JOIN user ON jurn.user_id = user.user_id
    LEFT JOIN family ON family.user_id = user.user_id
    LEFT JOIN reminder ON reminder.jurn_id = jurn.jurn_id
    WHERE user.user_id = ?`
    conn.query(sql, [user_id], (err, results, fields) => {
      results.forEach(item => {
        if (dashResults.jurns.filter(j => j.id === item.jurn_id).length > 0) {
          dashResults.jurns
            .find(j => j.id === item.jurn_id)
            .reminders.push(item.rem)
        } else {
          dashResults.jurns.push({
            id: item.jurn_id,
            name: item.jname,
            reminders: [item.rem]
          })
        }
      })

      const sql2 = `SELECT user.user_id, user.email, user.fname, user.lname, user.fam_id, user.cell_phone
        FROM user
        WHERE user.user_id = ?`
      conn.query(sql2, [user_id], (err2, results2, fields2) => {
        dashResults.user = results2[0]
        res.json({ dashboard: dashResults })
      })
    })
  })
})

router.get("/phase1/:jurn_id", (req, res, next) => {
  const jurn_id = req.params.jurn_id
  const P1Results = {
    locations: [],
    jname: {}
  }
  // Where we get the Jurn name based on the Jurn Id that is sent in URL
  const sqlJname = `SELECT jname
  FROM jurn
  WHERE jurn_id = ?`
  conn.query(sqlJname, [jurn_id], (errJname, resultsJname, fieldsJname) => {
    P1Results.jname = resultsJname[0]
    // Where we retrieve the locations associated with the Jurn ID
    const sqlLocName = `SELECT loc_name
    FROM location
    WHERE location.jurn_id = ?`
    conn.query(
      sqlLocName,
      [jurn_id],
      (errLocName, resultsLocName, fieldsLocName) => {
        resultsLocName.forEach(item => {
          P1Results.locations.push({
            location: item.loc_name
          })
        })
        res.json({ phase1: P1Results })
      }
    )
  })
})

router.get("/phase2/: jurn_id", (req, res, next) => {
  const jurn_id = req.params.jurn_id
  const sqlP2 = `SELECT rem, status
  FROM reminder
  WHERE jurn_id = ?`
  conn.query(sqlP2, [jurn_id], (errP2, resultsP2, fieldsP2) => {
    res.json(resultsP2)
  })
})

module.exports = router
