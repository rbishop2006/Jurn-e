const router = require("express").Router()
const conn = require("../../db")

router.patch("/remcomplete", (req, res, next) => {
  const rem_id = req.body.rem_id
  const sqlremComplete = `UPDATE reminder SET status = "completed" WHERE rem_id = ?`

  conn.query(
    sqlremComplete,
    [rem_id],
    (errremComplete, resultsremComplete, fieldsremComplete) => {
      res.json({
        message: "status updated to completed",
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
        message: "status updated",
      })
    }
  )
})

router.patch("/actcomplete", (req, res, next) => {
  const act_id = req.body.act_id
  const sqlactComplete = `UPDATE activity SET status = "completed" WHERE act_id = ?`

  conn.query(
    sqlactComplete,
    [act_id],
    (erractComplete, resultsactComplete, fieldsactComplete) => {
      res.json({
        message: "status updated to completed",
      })
    }
  )
})

router.patch("/activity", (req, res, next) => {
  const act_id = req.body.act_id
  const status = req.body.status
  const sqlToggleAct = `UPDATE activity SET status = ? WHERE act_id = ?`

  conn.query(
    sqlToggleAct,
    [status, act_id],
    (errToggleAct, resultsToggleAct, fieldsToggleAct) => {
      res.json({
        message: "status updated",
      })
    }
  )
})

router.patch("/updateprofile", (req, res, next) => {
  const fname = req.body.fname
  const lname = req.body.lname
  const cellphone = req.body.cellphone
  const avatar = req.body.avatar
  const user_id = req.body.user_id
  // Checking to see if inputs are empty.  If they are all empty, returns nothing and makes no changes
  if (
    fname.length === 0 &&
    lname.length === 0 &&
    cellphone.length === 0 &&
    avatar.length === 0
  ) {
    res.json({
      message: "nothing to update",
    })
  } else {
    // This is where we check to see if the individual inputs have content and build the Sql string to insert into the query below
    let sqlInsert = ""
    if (fname.length != 0) {
      if (sqlInsert.length === 0) {
        sqlInsert += "fname = ?"
      }
    }
    if (lname.length != 0) {
      if (sqlInsert.length === 0) {
        sqlInsert += "lname = ?"
      } else {
        sqlInsert += ", lname = ?"
      }
    }
    if (cellphone.length != 0) {
      if (sqlInsert.length === 0) {
        sqlInsert += "cell_phone = ?"
      } else {
        sqlInsert += ", cell_phone = ?"
      }
    }
    if (avatar.length != 0) {
      if (sqlInsert.length === 0) {
        sqlInsert += "avatar = ?"
      } else {
        sqlInsert += ", avatar = ?"
      }
    }

    const sqlProf = `UPDATE user SET ${sqlInsert} WHERE user_id = ?`
    // Build the array of inputs to put in the query below based on the string produces above
    let profileArr = []
    if (fname != 0) {
      profileArr.push(fname)
    }
    if (lname != 0) {
      profileArr.push(lname)
    }
    if (cellphone != 0) {
      profileArr.push(cellphone)
    }
    if (avatar != 0) {
      profileArr.push(avatar)
    }
    if (fname != 0 || lname != 0 || cellphone != 0 || avatar != 0) {
      profileArr.push(user_id)
    }

    conn.query(sqlProf, profileArr, (errProf, resultsProf, fieldsProf) => {
      res.json({
        message: "profile updated",
      })
    })
  }
})

router.patch("/updateaccept", (req, res, next) => {
  const user_id = req.body.user_id
  const jurn_id = req.body.jurn_id

  const sqlAccept = `UPDATE invite SET inv_status = "accepted" WHERE user_id = ? AND jurn_id = ?`

  conn.query(
    sqlAccept,
    [user_id, jurn_id],
    (errAccept, resultsAccept, fieldsAccept) => {
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
          user_id,
        ],
        (errR, resultsR, fieldsR) => {
          const sqlInLink = `INSERT INTO link (jurn_id, user_id) VALUES(?, ?)`
          conn.query(
            sqlInLink,
            [jurn_id, user_id],
            (errInLink, resultsInLink, fieldsInLink) => {
              res.json({
                message: "invite status updated and link added",
              })
            }
          )
        }
      )
    }
  )
})

router.patch("/updatedecline", (req, res, next) => {
  const user_id = req.body.user_id
  const jurn_id = req.body.jurn_id

  const sqlDecline = `UPDATE invite SET inv_status = "declined" WHERE user_id = ? AND jurn_id = ?`

  conn.query(
    sqlDecline,
    [user_id, jurn_id],
    (errDecline, resultsDecline, fieldsDecline) => {
      res.json({
        message: "invite status updated",
      })
    }
  )
})

router.patch("/removejurne", (req, res, next) => {
  const user_id = req.body.user_id
  const jurn_id = req.body.jurn_id
  const sqlDecline = `UPDATE invite SET inv_status = "declined" WHERE user_id = ? AND jurn_id = ?`
  conn.query(
    sqlDecline,
    [user_id, jurn_id],
    (errDecline, resultsDecline, fieldsDecline) => {
      const sqlDelLink = `DELETE FROM link WHERE user_id = ? AND jurn_id = ?`
      conn.query(
        sqlDelLink,
        [user_id, jurn_id],
        (errDelLink, resultsDelLink, fieldsDelLink) => {
          res.json({
            message: "invite status updated and Jurne removed",
          })
        }
      )
    }
  )
})

router.patch("/finaldates", (req, res, next) => {
  const jurn_id = req.body.jurn_id
  // Object.entries turns the object into an array to check to see if it is empty
  if (Object.entries(req.body.date).length > 0) {
    const date = req.body.date.split(",")
    const startDate = date[0]
    const endDate = date[1]
    const sqlUpdateJurnDate = `UPDATE jurn SET start_date = ?, end_date = ? WHERE jurn_id = ?`

    conn.query(
      sqlUpdateJurnDate,
      [startDate, endDate, jurn_id],
      (errUpdateJurnDate, resultsUpdateJurnDate, fieldsUpdateJurnDate) => {
        res.json({
          message: "dates updated",
        })
      }
    )
  } else {
    res.json({
      message: "dates not updated",
    })
  }
})

router.patch("/finallocation", (req, res, next) => {
  const jurn_id = req.body.jurn_id
  const location = req.body.location

  if (location.length > 0) {
    const sqlUpdateJurnLoc = `UPDATE jurn SET location = ? WHERE jurn_id = ?`

    conn.query(
      sqlUpdateJurnLoc,
      [location, jurn_id],
      (errUpdateJurnLoc, resultsUpdateJurnLoc, fieldsUpdateJurnLoc) => {
        res.json({
          message: "location updated",
        })
      }
    )
  } else {
    res.status(401).json({
      message: "Please select a location",
    })
  }
})

router.patch("/finalhotel", (req, res, next) => {
  const jurn_id = req.body.jurn_id
  const hotel = req.body.hotel

  if (hotel.length > 0) {
    const sqlUpdateJurnHot = `UPDATE jurn SET hotel = ? WHERE jurn_id = ?`

    conn.query(
      sqlUpdateJurnHot,
      [hotel, jurn_id],
      (errUpdateJurnHot, resultsUpdateJurnHot, fieldsUpdateJurnHot) => {
        res.json({
          message: "hotel updated",
        })
      }
    )
  } else {
    res.status(401).json({
      message: "Please select an accommodation",
    })
  }
})

router.patch("/finalphoto", (req, res, next) => {
  const jurn_id = req.body.jurn_id
  const photo = req.body.photo
  const sqlUpdateJurnPhoto = `UPDATE jurn 
  SET photo = ?
  WHERE jurn_id = ?`

  conn.query(
    sqlUpdateJurnPhoto,
    [photo, jurn_id],
    (errUpdateJurnPhoto, resultsUpdateJurnPhoto, fieldsUpdateJurnPhoto) => {
      res.json({
        message: "photo updated",
      })
    }
  )
})

module.exports = router
