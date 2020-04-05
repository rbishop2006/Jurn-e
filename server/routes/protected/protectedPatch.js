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

  const sqlProf = `UPDATE user SET fname = ?, lname = ?, cell_phone = ?, avatar = ? WHERE user_id = ?`

  conn.query(
    sqlProf,
    [fname, lname, cellphone, avatar, user_id],
    (errProf, resultsProf, fieldsProf) => {
      res.json({
        message: "profile updated",
      })
    }
  )
})

router.patch("/updateaccept", (req, res, next) => {
  const user_id = req.body.user_id
  const jurn_id = req.body.jurn_id

  const sqlAccept = `UPDATE invite SET inv_status = "accepted" WHERE user_id = ? AND jurn_id = ?`

  conn.query(
    sqlAccept,
    [user_id, jurn_id],
    (errAccept, resultsAccept, fieldsAccept) => {
      res.json({
        message: "invite status updated",
      })
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

router.patch("/finaldates", (req, res, next) => {
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
        message: "dates updated",
      })
    }
  )
})

router.patch("/finallocation", (req, res, next) => {
  const jurn_id = req.body.jurn_id
  const location = req.body.location
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
})

router.patch("/finalhotel", (req, res, next) => {
  const jurn_id = req.body.jurn_id
  const hotel = req.body.hotel
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
