import React, { useState } from "react"
import { Header, Button, Form } from "semantic-ui-react"
// import { useAuth } from "react-auth"
import { useDashboard } from "../../hooks"

export default props => {
  const { sendJurn, user } = useDashboard()
  const [newJurn, setNewJurn] = useState("")

  // Function to handle submitting a new Jurn from the form
  function handleSubmit(e) {
    e.preventDefault()
    sendJurn(
      user.id,
      newJurn
      // timestamp: new Date().getTime()
    )
  }

  return (
    <header>
      <Header as="h1">Jurn(e)</Header>
      <Form onSubmit={handleSubmit} className="create">
        <Form.Group inline widths="equal">
          <Form.Field>
            <label htmlFor="newJurn">Create a new Jurn(e)</label>
            <input
              id="newJurn"
              className="messageText"
              value={newJurn}
              type="text"
              onChange={e => setNewJurn(e.target.value)}
              placeholder="ex. Cancun 2020"
            />
            <Button type="submit">Create</Button>
          </Form.Field>
        </Form.Group>
      </Form>
    </header>
  )
}