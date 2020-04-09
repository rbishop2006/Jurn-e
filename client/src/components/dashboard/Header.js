import React, { useState } from "react"
import { Button, Form, Icon } from "semantic-ui-react"
import { useMain, useAside } from "../../hooks"
import validator from "validator"
import { Link } from "react-router-dom"
import "../../styles/dashboard.scss"

export default props => {
  const { sendJurn, get } = useMain()
  const { fetchAside } = useAside()
  const { aUser } = useAside()
  const [newJurn, setNewJurn] = useState("")
  const [newJurnError, setNewJurnError] = useState("")

  // Function to handle submitting a new Jurn from the below form

  function handleSubmit(e) {
    e.preventDefault()
    let valid = true

    if (validator.isEmpty(newJurn)) {
      valid = false
      setNewJurnError(` Please create a name for your Jurn(e), can't be blank`)
    } else {
      setNewJurnError("")
    }
    if (valid) {
      sendJurn(aUser.user_id, newJurn).then(user_id => {
        get()
        fetchAside()
        props.history.push("/Jurne/dashboard/" + user_id)
      })
    }
    setNewJurn("")
  }

  return (
    <header>
      <img src="/JurnEase-logo.png" alt="Jurn(ease) logo"></img>
      <Form onSubmit={handleSubmit} className="create">
        <Form.Group inline>
          <Form.Field>
            <label className={newJurnError ? "error" : ""} htmlFor="newJurn">
              add new Jurn(<em>e</em>)s here...{newJurnError && newJurnError}
            </label>
            <input
              id="newJurn"
              className={newJurnError ? "errorBox" : "messageText"}
              value={newJurn}
              type="text"
              onChange={e => setNewJurn(e.target.value)}
              placeholder="ex. Cancun 2020"
            />
            <Button type="submit">
              Create a new Jurn(<em>e</em>)
            </Button>
          </Form.Field>
        </Form.Group>
      </Form>
      <Link to="/Jurne/dashboard">
        <Button type="button">
          <span>
            My Jurn(<em>e</em>)s <Icon name="home" />
          </span>
        </Button>
      </Link>
    </header>
  )
}
