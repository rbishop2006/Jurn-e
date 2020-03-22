const express = require("express")
const postRoutes = require("./routes/post")
const getRoutes = require("./routes/get")
const app = express()
const port = 3001

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api", postRoutes)
app.use("/api", getRoutes)

app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`)
})
