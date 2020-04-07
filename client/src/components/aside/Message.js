import React, { useEffect, useRef } from "react"
import { useMessages } from "../../hooks"
import moment from "moment"
import "../../styles/aside/messages.scss"

export default (props) => {
  const { messages } = useMessages()
  // const jurn_id = props.match.params.jurn_id

  // useEffect(() => {
  //   const checkMessages = setInterval(() => {
  //     checkMessages(jurn_id)
  //   }, 5000)
  //   return () => clearInterval(checkMessages)
  // }, [])

  return (
    <section className="messageArea">
      {messages.map((msg, i) => (
        <p key={"message" + i}>
          <strong>
            <em>{msg.fname}:</em>
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
      <div />
    </section>
  )
}
