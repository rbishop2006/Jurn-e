import React, { useEffect } from "react"
import { useMessages } from "../../hooks"
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
          <span className="jurnName">{msg.jname}: </span>
          <span className="message">{msg.message} </span>
          <span>From: </span>
          <span>
            <strong>
              <em>{msg.fname} </em>
            </strong>
          </span>
          <span className="timeStamp">{moment(msg.timestamp).fromNow()}</span>
        </p>
      ))}
      <div />
    </section>
  )
}
