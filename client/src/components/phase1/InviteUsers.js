import React, { useState, useEffect } from "react"
import { Form, Button, Radio, List, Checkbox, Icon } from "semantic-ui-react"
import { useInvited } from "../../hooks"
import "../../styles/phase1/inviteUsers.scss"

export default props => {
  const {
    pending,
    accepted,
    declined,
    updateInvited,
    sendInvite
  } = useInvited()

  const jurn_id = props.match.params.jurn_id
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  function handleInvite(e) {
    e.preventDefault()
    sendInvite(firstName, lastName, jurn_id)
    setFirstName("")
    setLastName("")
    updateInvited(jurn_id)
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
            fluid
            label="First Name"
            placeholder="ex. Mary"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <Form.Input
            fluid
            label="Last Name"
            placeholder="ex. Smith"
            value={lastName}
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
