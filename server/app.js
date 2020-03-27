const express = require("express")
const postRoutes = require("./routes/post")
const getRoutes = require("./routes/get")
const expressjwt = require("express-jwt")
const protectedRoutes = require("./routes/protected.js")
const app = express()
const config = require("config")
const port = 3001
const createError = require("http-errors")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api", postRoutes)
app.use("/api", getRoutes)

app.use("/api", expressjwt({ secret: config.get("secret") }), protectedRoutes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(404)
  next(createError(404))
})

// error handler
app.use(function(req, res, next) {
  //set locals, only providing error in development
  res.locals.message = err.messageres.locals.error =
    req.app.get("env") === "development" ? err : {}

  // render the error package
  res.status(err.status || 500)
  res.json({
    status: err.status,
    error: err
  })
})

app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`)
})
