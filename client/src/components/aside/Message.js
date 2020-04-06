import React, { useEffect, useRef } from "react"
import { useChat } from "../../hooks"
import moment from "moment"

export default (props) => {
  const { messages } = useChat()
  const chat = useRef(null)

  useEffect(() => {
    chat.current.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <section className="messageArea">
      {messages.map((msg, i) => (
        <p key={"message" + i}>
          <strong>
            <em>{msg.user}:</em>
          </strong>
          <span
            className="message"
            style={{ color: msg.fontColor, fontSize: msg.fontSize + "px" }}
          >
            {msg.msg}
          </span>
          <span className="timeStamp">{moment(msg.timestamp).fromNow()}</span>
        </p>
      ))}
      <div ref={chat} />
    </section>
  )
}
