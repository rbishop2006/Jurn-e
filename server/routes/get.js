const express = require("express")
const router = express.Router()
const conn = require("../db")
const decode = require("jsonwebtoken").decode

router.get("/dashboard", (req, res, next) => {
  const profile = decode(req.headers.authorization.substring(7))

  //trying on postman

  const email = profile.email
  const sqlId = `SELECT user_id FROM user WHERE email = ?`

  conn.query(sqlId, [email], (errId, resultsId, fieldsId) => {
    const user_id = resultsId[0].user_id
    //new sql for dashboard
    const sqlDashboard = `SELECT jurn_Table.jurn_id, jurn_Table.jname, jurn_Table.location, jurn_Table.start_date, jurn_Table.end_date, jurn_Table.rem_count, COUNT(activity.act) as act_count
    FROM 
    (SELECT jurn.jurn_id, jurn.jname, jurn.location, jurn.start_date, jurn.end_date, COUNT(reminder.rem) as rem_count
    FROM jurn
    LEFT JOIN reminder ON jurn.jurn_id = reminder.jurn_id
    LEFT JOIN user ON user.user_id = jurn.user_id
    WHERE user.user_id = ?
    GROUP BY jurn.jurn_id) AS jurn_Table
    LEFT JOIN activity ON activity.jurn_id = jurn_Table.jurn_id
    GROUP BY jurn_Table.jurn_id`
    conn.query(
      sqlDashboard,
      [user_id],
      (errsqlDashboard, resultssqlDashboard, fieldssqlDashboard) => {
        console.log(resultssqlDashboard)
        res.json({ dashboard: resultssqlDashboard })
      }
    )
  })
})

router.get("/aside", (req, res, next) => {
  const profile = decode(req.headers.authorization.substring(7))
  //trying on postman
  const asideResults = {
    jurns: [],
    user: {}
  }
  const email = profile.email
  const sqlId = `SELECT user_id FROM user WHERE email = ?`
  conn.query(sqlId, [email], (errId, resultsId, fieldsId) => {
    const user_id = resultsId[0].user_id

    const sqlAsideJurns = `SELECT jurn.jurn_id, jurn.jname
    FROM jurn
    WHERE jurn.user_id = ?`
    conn.query(
      sqlAsideJurns,
      [user_id],
      (errAsideJurns, resultsAsideJurns, fieldsAsideJurns) => {
        resultsAsideJurns.forEach(item => {
          if (
            asideResults.jurns.filter(j => j.id === item.jurn_id).length > 0
          ) {
            asideResults.jurns.find(j => j.id === item.jurn_id)
          } else {
            asideResults.jurns.push({
              id: item.jurn_id,
              name: item.jname
            })
          }
        })
        const sqlAsideUser = `SELECT user.fname, user.lname, user.email, user.cell_phone
        FROM user
        WHERE user.user_id = ?`
        conn.query(
          sqlAsideUser,
          [user_id],
          (errAsideUser, resultsAsideUser, fieldsAsideUser) => {
            asideResults.user = resultsAsideUser[0]
            res.json({ aside: asideResults })
          }
        )
      }
    )
  })
})

router.get("/phase1/:jurn_id", (req, res, next) => {
  const jurn_id = req.params.jurn_id
  const P1Results = {
    locations: [],
    hotels: [],
    dateRange: [],
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
            const sqlGetDate = `SELECT start_date, end_date FROM date WHERE date.jurn_id = ?`
            conn.query(
              sqlGetDate,
              [jurn_id],
              (errGetDate, resultsGetDate, fieldsGetDate) => {
                resultsGetDate.forEach(item3 => {
                  P1Results.dateRange.push({
                    startDate: item3.start_date,
                    endDate: item3.end_date
                  })
                })
                res.json({ phase1: P1Results })
              }
            )
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
    //trying to switch to activities
    activities: []
  }
  const sqlP2JnameLocName = `SELECT jurn.jname, jurn.location FROM jurn WHERE jurn.jurn_id = ?`
  conn.query(
    sqlP2JnameLocName,
    [jurn_id],
    (errJnameLocName, resultsJnameLocName, fieldsJnameLocName) => {
      P2Results.jname = resultsJnameLocName[0]
      P2Results.location = resultsJnameLocName[0]

      const sqlActivities = `SELECT act FROM activity WHERE jurn_id = ?`
      conn.query(
        sqlActivities,
        [jurn_id],
        (errActivities, resultsActivities, fieldsActivities) => {
          resultsActivities.forEach(item => {
            P2Results.activities.push({
              activity: item.act
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

// const sql = `SELECT jurn.jurn_id, jurn.jname, jurn.location, jurn.user_id, user.fname, user.lname, user.fam_id, user.email, user.cell_phone, family.fam_name, reminder.rem
// FROM jurn
// LEFT JOIN user ON jurn.user_id = user.user_id
// LEFT JOIN family ON family.user_id = user.user_id
// LEFT JOIN reminder ON reminder.jurn_id = jurn.jurn_id
// WHERE user.user_id = ?`
// conn.query(sql, [user_id], (err, results, fields) => {
//   results.forEach(item => {
//     if (dashResults.jurns.filter(j => j.id === item.jurn_id).length > 0) {
//       dashResults.jurns
//         .find(j => j.id === item.jurn_id)
//         .reminders.push(item.rem)
//     } else {
//       dashResults.jurns.push({
//         id: item.jurn_id,
//         name: item.jname,
//         location: item.location,
//         reminders: [item.rem]
//       })
//     }
//   })

//   const sql2 = `SELECT user.user_id, user.email, user.fname, user.lname, user.fam_id, user.cell_phone
//     FROM user WHERE user.user_id = ?`
//   conn.query(sql2, [user_id], (err2, results2, fields2) => {
//     dashResults.user = results2[0]

//     res.json({ dashboard: dashResults })
//     console.log(dashResults)
//   })
// })

//trying RemCount sql
// const sqlRemCount = `SELECT COUNT(rem)
// FROM reminder
// LEFT JOIN link ON link.jurn_id = reminder.jurn_id
// WHERE link.user_id = ?`
// conn.query(
//   sqlRemCount,
//   [user_id],
//   (errRemCount, resultsRemCount, fieldsRemCount) => {
//     console.log(resultsRemCount)
//     resultsRemCount.forEach(item => {
//       dashResults.jurns.push({
//         count: item
//       })
//     })
//   }
// )
// res.json({ results: resultsrems, count: resultsrems.length })
