const express = require("express")
const router = express.Router()
const conn = require("../../db")

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

module.exports = router
