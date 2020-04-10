import React, { useState, useRef, useEffect } from "react"
import { useMessages, useAside } from "../../hooks"
import { Form, Dropdown } from "semantic-ui-react"
import "../../styles/aside/messages.scss"

export default (props) => {
  const { sendMessage, getMessages } = useMessages()
  const [message, setMessage] = useState("")
  const { aJurns, aUser } = useAside()
  const inputRef = useRef(null)
  const user_id = aUser.user_id
  const [jurnId, setJurnId] = useState("")
  const [error, setError] = useState(false)

  const jurns = []
  aJurns.map((jurn, i) => {
    return jurns.push({
      text: jurn.name,
      value: jurn.id,
      as: Dropdown.Item,
    })
  })

  function handleSubmit(e) {
    e.preventDefault()
    sendMessage(user_id, jurnId, message)
      .then((e) => {
        setMessage("")
        getMessages()
        inputRef.current.focus()
      })
      .catch((e) => {
        setError(true)
        setMessage("")
        getMessages()
      })
  }

  useEffect(() => {
    setError(false)
  }, [jurnId, message])

  return (
    <div className="messageInput">
      <Form onSubmit={handleSubmit} className="messageForm">
        <Form.Field>
          <Dropdown
            closeOnChange
            button
            labeled
            icon="arrow down"
            placeholder={"Select Jurn(e) to send message to..."}
            value={jurnId}
            onChange={(e, { value }) => setJurnId(value)}
            options={jurns}
          />
        </Form.Field>
        <Form.Field className="inputDiv">
          <Form.Input
            error={
              error
                ? {
                    content: "Please select a Jurn",
                    pointing: "above",
                  }
                : false
            }
            className="messageText"
            value={message}
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send a message..."
          />
        </Form.Field>
      </Form>
    </div>
  )
}
