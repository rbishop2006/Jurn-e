const express = require("express")
const router = express.Router()
const conn = require("../../db")
const decode = require("jsonwebtoken").decode

router.get("/main", (req, res, next) => {
  const profile = decode(req.headers.authorization.substring(7))

  //trying on postman
  const email = profile.email
  const sqlId = `SELECT user_id FROM user WHERE email = ?`
  conn.query(sqlId, [email], (errId, resultsId, fieldsId) => {
    const user_id = resultsId[0].user_id
    // trying to fix main
    const sqlLink = `SELECT jurn.jurn_id
    FROM jurn
    LEFT JOIN invite ON invite.jurn_id = jurn.jurn_id
    WHERE invite.user_id = ? AND invite.inv_status = "accepted"`
    conn.query(sqlLink, [user_id], (errLink, resultsLink, fieldsLink) => {
      let jurnIdSql = ""
      resultsLink.forEach((item, i) => {
        if (i === 0) {
          jurnIdSql += " WHERE invite.jurn_id = ? "
        } else {
          jurnIdSql += ` OR invite.jurn_id = ? `
        }
      })

      const sqlJurnDetails = `SELECT jurn_Table3.jurn_id, jurn_Table3.photo, jurn_Table3.jname, jurn_Table3.location, jurn_Table3.start_date,jurn_Table3.end_date, jurn_Table3.going_count, jurn_Table3.pend_count, jurn_Table3.rem_count, COUNT(activity.act) as act_count
      FROM
      (SELECT jurn_Table2.jurn_id, jurn_Table2.photo, jurn_Table2.jname, jurn_Table2.location, jurn_Table2.start_date, jurn_Table2.end_date, jurn_Table2.going_count, jurn_Table2.pend_count, COUNT(reminder.rem) as rem_count
      FROM
      (SELECT jurn_Table1.jurn_id, jurn_Table1.photo, jurn_Table1.jname, jurn_Table1.location, jurn_Table1.start_date, jurn_Table1.end_date, jurn_Table1.going_count, COUNT(invite.inv_status) as pend_count
      FROM
      (SELECT jurn.jurn_id, jurn.jname, jurn.photo, jurn.location, jurn.start_date, jurn.end_date, COUNT(invite.inv_status) as going_count
      FROM jurn
      LEFT JOIN invite ON jurn.jurn_id = invite.jurn_id
      ${jurnIdSql} AND invite.inv_status = "accepted"
      GROUP BY jurn.jurn_id) as jurn_Table1
      LEFT JOIN invite ON jurn_Table1.jurn_id = invite.jurn_id AND invite.inv_status = "pending"
      GROUP BY jurn_Table1.jurn_id) as jurn_Table2
      LEFT JOIN reminder ON jurn_Table2.jurn_id = reminder.jurn_id AND reminder.user_id = ${user_id}
      GROUP BY jurn_Table2.jurn_id) as jurn_Table3
      LEFT JOIN activity ON activity.jurn_id = jurn_Table3.jurn_id
      GROUP BY jurn_Table3.jurn_id`
      conn.query(
        sqlJurnDetails,
        resultsLink.map(item => item.jurn_id),
        (errJurnDetails, resultsJurnDetails, fieldsJurnDetails) => {
          res.json({ main: resultsJurnDetails })
        }
      )
    })
  })
})

router.get("/aside", (req, res, next) => {
  const profile = decode(req.headers.authorization.substring(7))
  const asideResults = {
    jurns: [],
    user: {},
    pendJurns: []
  }
  const email = profile.email
  const sqlId = `SELECT user_id FROM user WHERE email = ?`
  conn.query(sqlId, [email], (errId, resultsId, fieldsId) => {
    const user_id = resultsId[0].user_id

    // trying to fix aside

    const sqlAsideJurns = `SELECT jurn.jname, jurn.jurn_id
    FROM jurn
    LEFT JOIN invite ON invite.jurn_id = jurn.jurn_id
    WHERE inv_status = "accepted" AND invite.user_id = ?`
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
        const sqlAsideUser = `SELECT user.user_id, user.fname, user.lname, user.email, user.cell_phone, user.avatar
        FROM user
        WHERE user.user_id = ?`
        conn.query(
          sqlAsideUser,
          [user_id],
          (errAsideUser, resultsAsideUser, fieldsAsideUser) => {
            asideResults.user = resultsAsideUser[0]

            const sqlPendJurn = `SELECT jurn.jname, jurn.jurn_id
            FROM jurn
            LEFT JOIN invite ON invite.jurn_id = jurn.jurn_id
            WHERE inv_status = "pending" AND invite.user_id = ?`
            conn.query(
              sqlPendJurn,
              [user_id],
              (errPendJurn, resultsPendJurn, filedsPendJurn) => {
                resultsPendJurn.forEach(item => {
                  asideResults.pendJurns.push({
                    id: item.jurn_id,
                    name: item.jname
                  })
                })
                res.json({ aside: asideResults })
              }
            )
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
    activities: []
  }
  const sqlP2JnameLocName = `SELECT jurn.jname, jurn.location, jurn.hotel, jurn.start_date, jurn.end_date FROM jurn WHERE jurn.jurn_id = ?`
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

router.get("/reminders/:jurn_id/:user_id", (req, res, next) => {
  const status = (req.query && req.query.status) || null

  let statussql = ""
  const jurn_id = req.params.jurn_id
  const user_id = req.params.user_id

  if (status) {
    statussql = " AND status = ?"
  }
  const sqlRems = `SELECT rem, status, rem_id FROM reminder WHERE jurn_id = ? AND user_id = ? ${statussql}`
  const vars = status ? [jurn_id, user_id, status] : [jurn_id, user_id]
  conn.query(sqlRems, vars, (errRems, resultsRems, fieldsRems) => {
    res.json(resultsRems)
  })
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

router.get("/invited/:jurn_id", (req, res, next) => {
  const jurn_id = req.params.jurn_id
  const invitedResults = {
    pending: [],
    accepted: [],
    declined: []
  }

  const sqlAcc = `SELECT user.fname, user.lname, user.avatar 
  FROM invite
  LEFT JOIN user ON invite.user_id = user.user_id
  WHERE inv_status = "accepted" AND jurn_id = ?`
  conn.query(sqlAcc, [jurn_id], (errAcc, resultsAcc, fieldsAcc) => {
    resultsAcc.forEach(item => {
      invitedResults.accepted.push({
        fname: item.fname,
        lname: item.lname,
        avatar: item.avatar
      })
    })
    const sqlPend = `SELECT user.fname, user.lname, user.avatar 
    FROM invite
    LEFT JOIN user ON invite.user_id = user.user_id
    WHERE inv_status = "pending" AND jurn_id = ?`
    conn.query(sqlPend, [jurn_id], (errPend, resultsPend, fieldsPend) => {
      resultsPend.forEach(item1 => {
        invitedResults.pending.push({
          fname: item1.fname,
          lname: item1.lname,
          avatar: item1.avatar
        })
      })
      const sqlDec = `SELECT user.fname, user.lname, user.avatar 
      FROM invite
      LEFT JOIN user ON invite.user_id = user.user_id
      WHERE inv_status = "declined" AND jurn_id = ?`
      conn.query(sqlDec, [jurn_id], (errDec, resultsDec, fieldsDec) => {
        resultsDec.forEach(item1 => {
          invitedResults.declined.push({
            fname: item1.fname,
            lname: item1.lname,
            avatar: item1.avatar
          })
        })
        res.json({ invited: invitedResults })
      })
    })
  })
})

module.exports = router

// `SELECT jurn_Table.jurn_id, jurn_Table.jname, jurn_Table.location, jurn_Table.start_date, jurn_Table.end_date, jurn_Table.rem_count, COUNT(activity.act) as act_count
//     // FROM
//     // (SELECT jurn.jurn_id, jurn.jname, jurn.location, jurn.start_date, jurn.end_date, COUNT(reminder.rem) as rem_count
//     // FROM jurn
//     // LEFT JOIN reminder ON jurn.jurn_id = reminder.jurn_id
//     // LEFT JOIN user ON user.user_id = jurn.user_id
//     // WHERE user.user_id = ?
//     // GROUP BY jurn.jurn_id) AS jurn_Table
//     // LEFT JOIN activity ON activity.jurn_id = jurn_Table.jurn_id
//     // GROUP BY jurn_Table.jurn_id`
// SELECT jurn3_Table.jurn_id, jurn3_Table.jname, jurn3_Table.location, jurn3_Table.start_date, jurn3_Table.end_date, jurn3_Table.rem_count, jurn3_Table.act_count, jurn3_Table.accept_count, COUNT(inv_status) as pend_count
//     FROM
//     (SELECT jurn2_Table.jurn_id,jurn2_Table.jname, jurn2_Table.location, jurn2_Table.start_date, jurn2_Table.end_date, jurn2_Table.rem_count, jurn2_Table.act_count, COUNT(inv_status) as accept_count
//     FROM
//     (SELECT jurn_Table.jurn_id, jurn_Table.jname, jurn_Table.location, jurn_Table.start_date, jurn_Table.end_date, jurn_Table.rem_count, COUNT(activity.act) as act_count
//         FROM
//         (SELECT jurn.jurn_id, jurn.jname, jurn.location, jurn.start_date, jurn.end_date, COUNT(reminder.rem) as rem_count
//         FROM jurn
//         LEFT JOIN reminder ON jurn.jurn_id = reminder.jurn_id
//         LEFT JOIN user ON user.user_id = jurn.user_id
//         WHERE user.user_id = ?
//         GROUP BY jurn.jurn_id) AS jurn_Table
//         LEFT JOIN activity ON activity.jurn_id = jurn_Table.jurn_id
//         GROUP BY jurn_Table.jurn_id) AS jurn2_Table
//         LEFT JOIN invite ON invite.jurn_id = jurn2_Table.jurn_id AND invite.inv_status = "accepted"
//         GROUP BY jurn2_Table.jurn_id) AS jurn3_Table
//         LEFT JOIN invite ON invite.jurn_id = jurn3_Table.jurn_id AND inv_status = "pending"
//         GROUP BY jurn3_Table.jurn_id
// SELECT jurn_Table3.jurn_id, jurn_Table3.jname, jurn_Table3.location, jurn_Table3.start_date, jurn_Table3.end_date, jurn_Table3.accept_count, jurn_Table3.pend_count, jurn_Table3.rem_count, COUNT(activity.act) as act_count
//     FROM
//     (SELECT jurn_Table2.jurn_id, jurn_Table2.jname, jurn_Table2.location, jurn_Table2.start_date, jurn_Table2.end_date, jurn_Table2.accept_count, jurn_Table2.pend_count, COUNT(reminder.rem) as rem_count
//     FROM
//     (SELECT jurn_Table1.jurn_id, jurn_Table1.jname, jurn_Table1.location, jurn_Table1.start_date, jurn_Table1.end_date, jurn_Table1.accept_count, COUNT(inv_status) as pend_count
//     FROM
//     (SELECT jurn.jurn_id, jurn.jname, jurn.location, jurn.start_date, jurn.end_date, COUNT(inv_status) as accept_count
//     FROM jurn
//     LEFT JOIN invite ON jurn.jurn_id = invite.jurn_id
//     LEFT JOIN user ON user.user_id = jurn.user_id
//     WHERE invite.inv_status = "accepted" AND invite.user_id = ?
//     GROUP BY jurn.jurn_id) AS jurn_Table1
//     LEFT JOIN invite ON invite.jurn_id = jurn_Table1.jurn_id AND inv_status = "pending"
//     GROUP BY jurn_Table1.jurn_id) AS jurn_Table2
//     LEFT JOIN reminder ON jurn_Table2.jurn_id = reminder.jurn_id
//     GROUP BY jurn_Table2.jurn_id) as jurn_Table3
//     LEFT JOIN activity ON activity.jurn_id = jurn_Table3.jurn_id
//     GROUP BY jurn_Table3.jurn_id
// conn.query(sqlId, [email], (errId, resultsId, fieldsId) => {
//   const user_id = resultsId[0].user_id
//   const sqlDashboard = `SELECT jurn_Table2.jurn_id, jurn_Table2.jname, jurn_Table2.location, jurn_Table2.start_date, jurn_Table2.end_date, jurn_Table2.rem_count, COUNT(activity.act) as act_count
//   FROM
//   (SELECT jurn_Table1.jurn_id, jurn_Table1.jname, jurn_Table1.location, jurn_Table1.start_date, jurn_Table1.end_date, COUNT(reminder.rem) as rem_count
//   FROM
//   (SELECT jurn.jurn_id, jurn.jname, jurn.location, jurn.start_date, jurn.end_date
//       FROM jurn
//       LEFT JOIN invite ON jurn.jurn_id = invite.jurn_id
//       LEFT JOIN user ON user.user_id = jurn.user_id
//       WHERE invite.user_id = ? and invite.inv_status = "accepted"
//       GROUP BY jurn.jurn_id) as jurn_Table1
//        LEFT JOIN reminder ON jurn_Table1.jurn_id = reminder.jurn_id
//       GROUP BY jurn_Table1.jurn_id) as jurn_Table2
//     LEFT JOIN activity ON activity.jurn_id = jurn_Table2.jurn_id
//       GROUP BY jurn_Table2.jurn_id`
//   conn.query(
//     sqlDashboard,
//     [user_id],
//     (errsqlDashboard, resultssqlDashboard, fieldssqlDashboard) => {
//       console.log(resultssqlDashboard)
//       res.json({ dashboard: resultssqlDashboard })
//     }
//   )
// })
