import React, { useEffect, useRef } from "react"
import { useMessages, useAside } from "../../hooks"
import moment from "moment"
import "../../styles/aside/messages.scss"

export default (props) => {
  const { messages, getMessages } = useMessages()

  useEffect(() => {
    const checkMessages = setInterval(() => {
      getMessages()
    }, 5000)
    return () => clearInterval(checkMessages)
  }, [])

  return (
    <section className="messageArea">
      {messages.map((msg, i) => (
        <p key={"message" + i}>
          From:
          <strong>
            <em>{msg.fname}:</em>
          </strong>
          <span>to: {msg.jname}</span>
          <span className="message">{msg.message}</span>
          <span className="timeStamp">{moment(msg.timestamp).fromNow()}</span>
        </p>
      ))}
      <div />
    </section>
  )
}
