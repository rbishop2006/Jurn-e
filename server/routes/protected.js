const router = require("express").Router()

router.get("/dashboard", (req, res, next) => {
  res.json({
    foo: "bar"
  })
})

module.exports = router
