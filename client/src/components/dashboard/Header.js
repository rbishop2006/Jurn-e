import React, { useState } from "react"
import { Button, Form } from "semantic-ui-react"
import { useDashboard } from "../../hooks"
import { Link } from "react-router-dom"
import "../../styles/dashboard.scss"

export default props => {
  const { sendJurn, user, get } = useDashboard()
  const [newJurn, setNewJurn] = useState("")

  // Function to handle submitting a new Jurn from the below form
  function handleSubmit(e) {
    e.preventDefault()
    sendJurn(user.user_id, newJurn).then(id => {
      get()
      props.history.push("/Jurne/dashboard/" + id)
    })
    setNewJurn("")
  }

  return (
    <header>
      <img src="/assets/JurnEase-logo.png" alt="Jurn(ease) logo"></img>
      <Form onSubmit={handleSubmit} className="create">
        <Form.Group inline>
          <Form.Field>
            {/* <label htmlFor="newJurn">Create a new Jurn(e)</label> */}
            <input
              id="newJurn"
              className="messageText"
              value={newJurn}
              type="text"
              onChange={e => setNewJurn(e.target.value)}
              placeholder="ex. Cancun 2020"
            />
            <Button type="submit">Create a new Jurn(e)</Button>
          </Form.Field>
        </Form.Group>
      </Form>
      <Link to="/Jurne/dashboard">
        <Button type="button">Dashboard</Button>
      </Link>
    </header>
  )
}
