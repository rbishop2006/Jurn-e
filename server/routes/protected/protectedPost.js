const router = require("express").Router()
const conn = require("../../db")

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
      // trying to add filters

      const sqlCheckInv = `SELECT * 
      FROM invite
      WHERE jurn_id = ? AND user_id = ?`

      conn.query(
        sqlCheckInv,
        [jurn_id, user_id],
        (errCheckInv, resultsCheckInv, fieldsCheckInv) => {
          if (resultsCheckInv.length > 0) {
            if (resultsCheckInv[0].inv_status === "accepted") {
              res.json({
                message: "status already accepted"
              })
            } else {
              const sqlUpdInv = `
            UPDATE invite
            SET inv_status = "pending" 
            WHERE invite.jurn_id = ? AND invite.user_id = ?`
              conn.query(
                sqlUpdInv,
                [jurn_id, user_id],
                (errUpdInv, resultsUpdInv, fieldsUpdInv) => {
                  res.json({
                    message: "status updated to pending"
                  })
                }
              )
            }
          } else {
            const sqlInvite = `INSERT INTO invite
          (jurn_id, user_id, inv_status)
          VALUES
          (?, ?, "pending")`
            conn.query(
              sqlInvite,
              [jurn_id, user_id],
              (errInvite, resultsInvite, fieldsInvite) => {
                console.log(resultsInvite)
                res.json({
                  message: "pending invite"
                })
              }
            )
          }
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
        // const sqlGetJurn_id = `SELECT jurn_id FROM jurn WHERE jname = ?`
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
                const sqlR = `INSERT INTO reminder (rem, status, jurn_id, user_id)
                VALUES
                    ("Alert your credit card company", "active", ?, ?),
                    ("Contact your cell phone company","active",  ?, ?),
                    ("Notify your home security system operator","active",  ?, ?),
                    ("Confirm all reservations","active",  ?, ?),
                    ("Make advance payments on bills that have due dates during your trip","active",  ?, ?),
                    ("Check the weather","active",  ?, ?),
                    ("Eat, throw out, or give away any perishable food","active", ?, ?),
                    ("Leave an itinerary with a friend or family member","active",  ?, ?),
                    ("Place a hold on your mail delivery","active",  ?, ?),
                    ("Bring in outdoor furniture","active", ?, ?)`
                conn.query(
                  sqlR,
                  [
                    jurn_id,
                    user_id,
                    jurn_id,
                    user_id,
                    jurn_id,
                    user_id,
                    jurn_id,
                    user_id,
                    jurn_id,
                    user_id,
                    jurn_id,
                    user_id,
                    jurn_id,
                    user_id,
                    jurn_id,
                    user_id,
                    jurn_id,
                    user_id,
                    jurn_id,
                    user_id
                  ],
                  (errR, resultsR, fieldsR) => {
                    res.json({
                      message: "jurn added successfully",
                      id: jurn_id
                    })
                  }
                )
              }
            )
          }
        )
      })
    }
  })
})

router.post("/finaldates", (req, res, next) => {
  const jurn_id = req.body.jurn_id
  const date = req.body.date.split(",")
  const startDate = date[0]
  const endDate = date[1]
  const sqlUpdateJurnDate = `UPDATE jurn SET start_date = ?, end_date = ? WHERE jurn_id = ?`

  conn.query(
    sqlUpdateJurnDate,
    [startDate, endDate, jurn_id],
    (errUpdateJurnDate, resultsUpdateJurnDate, fieldsUpdateJurnDate) => {
      res.json({
        message: "dates updated"
      })
    }
  )
})

router.post("/finallocation", (req, res, next) => {
  const jurn_id = req.body.jurn_id
  const location = req.body.location
  const sqlUpdateJurnLoc = `UPDATE jurn SET location = ? WHERE jurn_id = ?`

  conn.query(
    sqlUpdateJurnLoc,
    [location, jurn_id],
    (errUpdateJurnLoc, resultsUpdateJurnLoc, fieldsUpdateJurnLoc) => {
      res.json({
        message: "location updated"
      })
    }
  )
})

router.post("/finalhotel", (req, res, next) => {
  const jurn_id = req.body.jurn_id
  const hotel = req.body.hotel
  const sqlUpdateJurnHot = `UPDATE jurn SET hotel = ? WHERE jurn_id = ?`

  conn.query(
    sqlUpdateJurnHot,
    [hotel, jurn_id],
    (errUpdateJurnHot, resultsUpdateJurnHot, fieldsUpdateJurnHot) => {
      res.json({
        message: "hotel updated"
      })
    }
  )
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

module.exports = router

// router.post("/phase1", (req, res, next) => {
//   const jurn_id = req.body.jurn_id
//   const hotel = req.body.hotel

//   const sqlJurnPost = "SELECT rems_status FROM jurn WHERE jurn_id = ?"
//   conn.query(
//     sqlJurnPost,
//     [jurn_id],
//     (errJurnPost, resultsJurnPost, fieldsJurnPost) => {
//       if (resultsJurnPost[0].rems_status == "posted") {
//         const sqlUpdateJurn = `UPDATE jurn SET location = ?, hotel = ?, start_date = ?, end_date = ? WHERE jurn_id = ?`

//         conn.query(
//           sqlUpdateJurn,
//           [location, hotel, startDate, endDate, jurn_id],
//           (errUpJurn, resultsUpJurn, fieldsUpJurn) => {
//             res.json({
//               message: "location, hotel, dates updated"
//             })
//           }
//         )
//       } else {
//   const sqlR = `INSERT INTO reminder (rem, status, jurn_id)
// VALUES
//     ("Alert your credit card company", "active", ?),
//     ("Contact your cell phone company","active", ?),
//     ("Notify your home security system operator","active", ?),
//     ("Confirm all reservations","active", ?),
//     ("Make advance payments on bills that have due dates during your trip","active", ?),
//     ("Check the weather","active", ?),
//     ("Eat, throw out, or give away any perishable food","active", ?),
//     ("Leave an itinerary with a friend or family member","active", ?),
//     ("Place a hold on your mail delivery","active", ?),
//     ("Bring in outdoor furniture","active", ?)`
//         conn.query(
//           sqlR,
//           [
//             jurn_id,
//             jurn_id,
//             jurn_id,
//             jurn_id,
//             jurn_id,
//             jurn_id,
//             jurn_id,
//             jurn_id,
//             jurn_id,
//             jurn_id
//           ],
//           (errR, resultsR, fieldsR) => {
//             const sqlUpdateJurn = `UPDATE jurn SET location = ?, hotel = ?, start_date = ?, end_date = ?, rems_status = "posted"  WHERE jurn_id = ?`

//             conn.query(
//               sqlUpdateJurn,
//               [location, hotel, startDate, endDate, jurn_id],
//               (errUpJurn, resultsUpJurn, fieldsUpJurn) => {
//                 res.json({
//                   message: "location, hotel, dates updated and reminders added"
//                 })
//               }
//             )
//           }
//         )
//       }
//     }
//   )
// })
