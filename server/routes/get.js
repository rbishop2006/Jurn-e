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
  const sqlId = `SELECT user_id FROM user WHERE email = ?`

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
            location: item.location,
            reminders: [item.rem]
          })
        }
      })

      const sql2 = `SELECT user.user_id, user.email, user.fname, user.lname, user.fam_id, user.cell_phone
        FROM user WHERE user.user_id = ?`
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
    hotels: [],
    jname: {}
  }
  // Where we get the Jurn name based on the Jurn Id that is sent in URL
  const sqlJname = `SELECT jname FROM jurn WHERE jurn_id = ?`
  conn.query(sqlJname, [jurn_id], (errJname, resultsJname, fieldsJname) => {
    P1Results.jname = resultsJname[0]
    // Where we retrieve the locations associated with the Jurn ID
    const sqlLocName = `SELECT loc_name FROM location WHERE location.jurn_id = ?`
    conn.query(
      sqlLocName,
      [jurn_id],
      (errLocName, resultsLocName, fieldsLocName) => {
        resultsLocName.forEach(item => {
          P1Results.locations.push({
            location: item.loc_name
          })
        })
        // Where we retrieve the hotels associated with the Jurn ID
        const sqlHotName = `SELECT hotel_name FROM hotel WHERE hotel.jurn_id = ?`
        conn.query(
          sqlHotName,
          [jurn_id],
          (errHotName, resultsHotName, fieldsHotName) => {
            resultsHotName.forEach(item2 => {
              P1Results.hotels.push({
                hotel: item2.hotel_name
              })
            })
            res.json({ phase1: P1Results })
          }
        )
      }
    )
  })
})

router.get("/phase2/:jurn_id", (req, res, next) => {
  const jurn_id = req.params.jurn_id
  const P2Results = {
    jname: {},
    location: {},
    reminders: []
  }
  const sqlP2JnameLocName = `SELECT jurn.jname, jurn.location FROM jurn WHERE jurn.jurn_id = ?`
  conn.query(
    sqlP2JnameLocName,
    [jurn_id],
    (errJnameLocName, resultsJnameLocName, fieldsJnameLocName) => {
      P2Results.jname = resultsJnameLocName[0]
      P2Results.location = resultsJnameLocName[0]

      const sqlReminders = `SELECT rem FROM reminder WHERE jurn_id = ?`
      conn.query(
        sqlReminders,
        [jurn_id],
        (errReminders, resultsReminders, fieldsReminders) => {
          resultsReminders.forEach(item => {
            P2Results.reminders.push({
              reminder: item.rem
            })
          })
          res.json({ phase2: P2Results })
        }
      )
    }
  )
})

router.get("/reminders/:jurn_id", (req, res, next) => {
  const status = (req.query && req.query.status) || null

  let statussql = ""
  const jurn_id = req.params.jurn_id
  if (status) {
    statussql = " AND status = ?"
  }
  const sqlRems = `SELECT rem, status, rem_id FROM reminder WHERE jurn_id = ? ${statussql}`
  const vars = status ? [jurn_id, status] : [jurn_id]
  conn.query(sqlRems, vars, (errRems, resultsrems, fieldsRems) => {
    res.json(resultsrems)
  })
})

router.delete("/reminder/:rem_id", (req, res, next) => {
  const rem_id = req.params.rem_id
  const sqlClear = `DELETE FROM reminder WHERE rem_id = ?`
  conn.query(
    sqlClear,
    [rem_id],
    (errsqlClear, resultssqlClear, fieldssqlClear) => {
      res.json({
        message: "reminder deleted"
      })
    }
  )
})

router.delete("/activity/:act_id", (req, res, next) => {
  console.log(req.params.act_id)
  const act_id = req.params.act_id
  const sqlClearAct = `DELETE FROM activity WHERE act_id = ?`
  conn.query(
    sqlClearAct,
    [act_id],
    (errssqlClearAct, resultsssqlClearAct, fieldsssqlClearAct) => {
      res.json({
        message: "activity deleted"
      })
    }
  )
})

router.get("/togglerem/:rem_id", (req, res, next) => {
  const rem_id = req.params.rem_id
  const sqlRemId = `SELECT status, rem_id FROM reminder WHERE rem_id = ?`
  conn.query(sqlRemId, [rem_id], (errRemId, resultsRemId, fieldsRemId) => {
    res.json(resultsRemId[0])
  })
})

router.get("/activities/:jurn_id", (req, res, next) => {
  const status = (req.query && req.query.status) || null

  let statussql = ""
  const jurn_id = req.params.jurn_id
  if (status) {
    statussql = " AND status = ?"
  }
  const sqlActs = `SELECT act, status, act_id FROM activity WHERE jurn_id = ? ${statussql}`
  const vars = status ? [jurn_id, status] : [jurn_id]
  conn.query(sqlActs, vars, (errActs, resultsActs, fieldsActs) => {
    res.json(resultsActs)
  })
})

router.get("/toggleact/:act_id", (req, res, next) => {
  const act_id = req.params.act_id
  const sqlActId = `SELECT status, act_id FROM activity WHERE act_id = ?`
  conn.query(sqlActId, [act_id], (errActId, resultsActId, fieldsActId) => {
    res.json(resultsActId[0])
  })
})

// res.json({ results: resultsrems, count: resultsrems.length })

module.exports = router
