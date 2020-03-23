import React, { useState } from "react"
import { Header, Button, Form } from "semantic-ui-react"
// import { useAuth } from "react-auth"
import { useJurns } from "../../hooks"

export default props => {
  const { sendJurn } = useJurns()
  const [newJurne, setNewJurne] = useState("")
  // const { profile } = useAuth()

  function handleSubmit(e) {
    e.preventDefault()
    sendJurn({
      // user: user_id,
      jname: newJurne,
      timestamp: new Date().getTime()
    })
  }

  return (
    <header>
      <Header as="h1">Jurn(e)</Header>
      <Form onSubmit={handleSubmit} className="create">
        <Form.Group inline widths="equal">
          <Form.Field>
            <label>Create a new Jurn(e)</label>
            <input
              id="newJurne"
              className="messageText"
              value={newJurne}
              type="text"
              onChange={e => setNewJurne(e.target.value)}
              placeholder="ex. Cancun 2020"
            />
            <Button type="submit">Create</Button>
          </Form.Field>
        </Form.Group>
      </Form>
    </header>
  )
}
