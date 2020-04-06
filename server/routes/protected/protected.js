const router = require("express").Router()

router.get("/Jurne", (req, res, next) => {
  res.json({
    foo: "bar",
  })
})

module.exports = router
