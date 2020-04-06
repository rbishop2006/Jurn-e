import React, { useState } from "react"
import { Button, Form } from "semantic-ui-react"
import { useMain, useAside } from "../../hooks"
import { Link } from "react-router-dom"
import "../../styles/dashboard.scss"

export default props => {
  const { sendJurn, get } = useMain()
  const { fetchAside } = useAside()
  const { aUser } = useAside()
  const [newJurn, setNewJurn] = useState("")

  // Function to handle submitting a new Jurn from the below form
  function handleSubmit(e) {
    e.preventDefault()
    sendJurn(aUser.user_id, newJurn).then(user_id => {
      get()
      fetchAside()
      props.history.push("/Jurne/dashboard/" + user_id)
    })
    setNewJurn("")
  }

  return (
    <header>
      <img src="/JurnEase-logo.png" alt="Jurn(ease) logo"></img>

      <Form onSubmit={handleSubmit} className="create">
        <Form.Group inline>
          <Form.Field>
            <input
              id="newJurn"
              className="messageText"
              value={newJurn}
              type="text"
              onChange={e => setNewJurn(e.target.value)}
              placeholder="ex. Cancun 2020"
            />
            <Button type="submit">
              Create a new Jurn
              <span>
                <em>(e)</em>
              </span>
            </Button>
          </Form.Field>
        </Form.Group>
      </Form>
      <Link to="/Jurne/dashboard">
        <Button type="button">Dashboard</Button>
      </Link>
    </header>
  )
}
