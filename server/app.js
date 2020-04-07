const express = require("express")
const app = express()
const postRoutes = require("./routes/post")
const protectedPostRoutes = require("./routes/protected/protectedPost")
const protectedGetRoutes = require("./routes/protected/protectedGet")
const protectedPatchRoutes = require("./routes/protected/protectedPatch")
const protectedDeleteRoutes = require("./routes/protected/protectedDelete")
const protectedRoutes = require("./routes/protected/protected.js")
const expressjwt = require("express-jwt")
const config = require("config")
const createError = require("http-errors")

const port = 3001

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api", postRoutes)
app.use(
  "/api",
  expressjwt({ secret: config.get("secret") }),
  protectedPostRoutes
)
app.use(
  "/api",
  expressjwt({ secret: config.get("secret") }),
  protectedGetRoutes
)
app.use(
  "/api",
  expressjwt({ secret: config.get("secret") }),
  protectedDeleteRoutes
)
app.use(
  "/api",
  expressjwt({ secret: config.get("secret") }),
  protectedPatchRoutes
)

app.use("/api", expressjwt({ secret: config.get("secret") }), protectedRoutes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log(404)
  next(createError(404))
})

// error handler
app.use(function (req, res, next) {
  //set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}
  // render the error package
  res.status(err.status || 500)
  res.json({
    status: err.status,
    error: err,
  })
})

app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`)
})
