import React, { useEffect, useRef } from "react"
import { useMessages, useAside } from "../../hooks"
import moment from "moment"
import "../../styles/aside/messages.scss"

export default (props) => {
  const { messages, getMessages } = useMessages()
  const { aUser } = useAside()
  // const jurn_id = props.match.params.jurn_id
  const user_id = aUser.user_id
  getMessages(user_id)

  useEffect(() => {
    const checkMessages = setInterval(() => {
      getMessages(user_id)
    }, 5000)
    return () => clearInterval(checkMessages)
  }, [])

  return (
    <section className="messageArea">
      {messages.map((msg, i) => (
        <p key={"message" + i}>
          <strong>
            <em>{msg.fname}:</em>
          </strong>
          <span className="message">{msg.message}</span>
          <span className="timeStamp">{moment(msg.timestamp).fromNow()}</span>
        </p>
      ))}
      <div />
    </section>
  )
}
