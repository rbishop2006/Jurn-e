import React, { useState, useRef } from "react"
import { useChat, useAside } from "../../hooks"

export default (props) => {
  const { add } = useChat()
  const [message, setMessage] = useState("")
  const { aUser } = useAside()
  const [fontColor, setFontColor] = useState("#eeeeee")
  const [fontSize, setFontSize] = useState("12")
  const inputRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault()
    add({
      user: aUser.fname,
      msg: message,
      timestamp: new Date().getTime(),
      fontColor: fontColor,
      fontSize: fontSize,
    })

    setMessage("")
    inputRef.current.focus()
  }

  function keyUp(e) {
    if (e.key === "Enter") {
      handleSubmit(e)
    }
  }

  return (
    <div className="footer">
      <form onSubmit={handleSubmit}>
        <div className="inputDiv">
          <input
            style={{ color: fontColor, fontSize: fontSize + "px" }}
            className="messageText"
            value={message}
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            placeholder={"Send a message..."}
            onKeyUp={keyUp}
            ref={inputRef}
          />
          <div>
            <input
              className="messageColor"
              type="color"
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
            />
            <input
              className="messageSize"
              type="text"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
