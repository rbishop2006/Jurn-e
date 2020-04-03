const express = require("express")
const router = express.Router()
const conn = require("../db")

router.patch("/remcomplete", (req, res, next) => {
  const rem_id = req.body.rem_id
  const sqlremComplete = `UPDATE reminder SET status = "completed" WHERE rem_id = ?`

  conn.query(
    sqlremComplete,
    [rem_id],
    (errremComplete, resultsremComplete, fieldsremComplete) => {
      res.json({
        message: "status updated to completed"
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
        message: "status updated"
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
        message: "status updated to completed"
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
        message: "status updated"
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
        message: "profile updated"
      })
    }
  )
})

module.exports = router
