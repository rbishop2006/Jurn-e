const express = require("express")
const userRoutes = require("./routes/user")
const app = express()
const port = 3001

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api", userRoutes)

app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`)
})
