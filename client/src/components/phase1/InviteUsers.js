import React, { useState, useEffect } from "react"
import { Form, Button, Radio, List, Checkbox, Icon } from "semantic-ui-react"
import validator from "validator"
import { useInvited } from "../../hooks"
import "../../styles/phase1/inviteUsers.scss"

export default props => {
  //trying to add validator

  const {
    pending,
    accepted,
    declined,
    updateInvited,
    sendInvite
  } = useInvited()

  const jurn_id = props.match.params.jurn_id
  const [firstName, setFirstName] = useState("")
  const [firstNameError, setFirstNameError] = useState("")
  const [lastName, setLastName] = useState("")
  const [lastNameError, setLastNameError] = useState("")
  const [error, setError] = useState(false)

  //trying to set up error handle

  function handleInvite(e) {
    e.preventDefault()

    let valid = true

    if (validator.isEmpty(firstName)) {
      valid = false
      setFirstNameError("Cannot be blank, must contain a first name")
    } else {
      setFirstNameError("")
    }
    if (validator.isEmpty(lastName)) {
      valid = false
      setLastNameError("Cannot be blank, must contain a first name")
    } else {
      setLastNameError("")
    }
    if (valid) {
      sendInvite(firstName, lastName, jurn_id)
        .then(e => {
          setFirstName("")
          setLastName("")
          updateInvited(jurn_id)
        })

        .catch(e => {
          setError(true)
          setFirstName("")
          setLastName("")
          updateInvited(jurn_id)
        })
    }
  }

  useEffect(() => {
    updateInvited(jurn_id)
  }, [jurn_id, firstName, lastName])

  return (
    <div className="inviteDiv">
      <Form onSubmit={handleInvite}>
        <h3>
          Invite Travelers to go on this Jurn(<em>e</em>)
        </h3>
        <Form.Group className="inviteSect">
          <Form.Input
            error={
              error
                ? { content: "Invitee not found", pointing: "below" }
                : false
            }
            fluid
            label={
              firstNameError
                ? "Cannot be blank, must contain a first name"
                : "First Name"
            }
            placeholder="ex. Mary"
            value={firstName}
            className={firstNameError ? "error" : ""}
            onChange={e => setFirstName(e.target.value)}
          />
          <Form.Input
            error={
              error
                ? { content: "Invitee not found", pointing: "below" }
                : false
            }
            fluid
            label={
              lastNameError
                ? "Cannot be blank, must contain a last name"
                : "Last Name"
            }
            placeholder="ex. Smith"
            value={lastName}
            className={lastNameError ? "error" : ""}
            onChange={e => setLastName(e.target.value)}
          />
        </Form.Group>

        <Button id="submitInvite" type="submit">
          <span>
            Invite <Icon name="users" />
          </span>
        </Button>
      </Form>

      <List>
        <h3>Pending:</h3>
        {pending.map((pend, i) => (
          <List.Item key={"pending" + i}>
            <List.Icon name={pend.avatar} />
            <List.Content>{pend.fname + " " + pend.lname}</List.Content>
          </List.Item>
        ))}
      </List>
      <List>
        <h3>Accepted:</h3>
        {accepted.map((accept, i) => (
          <List.Item key={"accept" + i}>
            <List.Icon name={accept.avatar} />
            <List.Content>{accept.fname + " " + accept.lname}</List.Content>
          </List.Item>
        ))}
        <h3>Declined:</h3>
        {declined.map((decl, i) => (
          <List.Item key={"decline" + i}>
            <List.Icon name={decl.avatar} />
            <List.Content>{decl.fname + " " + decl.lname}</List.Content>
          </List.Item>
        ))}
      </List>
    </div>
  )
}
