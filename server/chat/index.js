module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("connected")

    socket.on("new message", (msg) => io.emit("new message", msg))
  })
}
