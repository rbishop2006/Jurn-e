module.exports = function (io) {
  io.on("connection", function (socket) {
    console.log("connected")
    socket.on("message", (msg) => {
      io.emit("message", msg)
    })
  })
}
