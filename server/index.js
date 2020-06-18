const express = require("express")
const path = require("path")
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

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "public")))

app.use("/api", postRoutes)
app.use(
	"/api",
	expressjwt({ secret: process.env.secret || config.get("secret") }),
	protectedPostRoutes
)
app.use(
	"/api",
	expressjwt({ secret: process.env.secret || config.get("secret") }),
	protectedGetRoutes
)
app.use(
	"/api",
	expressjwt({ secret: process.env.secret || config.get("secret") }),
	protectedDeleteRoutes
)
app.use(
	"/api",
	expressjwt({ secret: process.env.secret || config.get("secret") }),
	protectedPatchRoutes
)

app.use(
	"/api",
	expressjwt({ secret: process.env.secret || config.get("secret") }),
	protectedRoutes
)

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

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/public/index.html"))
})

const port = process.env.PORT || 3001
app.listen(port, () => {
	console.log(`LISTENING ON PORT ${port}`)
})
