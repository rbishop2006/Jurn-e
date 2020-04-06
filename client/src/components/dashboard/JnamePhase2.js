import React, { useEffect, useState } from "react"
import { List, Checkbox, Tab, Form, Radio, Button } from "semantic-ui-react"
import { useMain, useAside } from "../../hooks"
import { usePhase2, useRems, useInvited } from "../../hooks"
import { Link } from "react-router-dom"
import "../../styles/phase2.scss"
import moment from "moment"

export default props => {
  const { aUser } = useAside()

  const { accepted, updateInvited } = useInvited()
  const [reminder, setReminder] = useState("")
  const { jurnInfo, updatePhase2, activities } = usePhase2()
  const {
    rems,
    remsCount,
    addRem,
    toggleRem,
    filterRems,
    clearRems,
    updateRems
  } = useRems()

  const jurn_id = props.match.params.jurn_id
  const user_id = aUser.user_id

  function handleSubmit(e) {
    e.preventDefault()
    addRem(reminder, jurn_id, user_id)
    setReminder("")
  }
  const [view, setView] = useState("all")

  function changeView(status) {
    setView(status)
    filterRems(status, jurn_id, user_id)
  }

  useEffect(() => {
    updatePhase2(jurn_id)
    updateRems(jurn_id, user_id)
    updateInvited(jurn_id)
  }, [jurn_id, user_id, reminder])

  const panes = [
    {
      menuItem: `People going: (${accepted.length})`,
      render: () => (
        <Tab.Pane attached={false}>
          <List bulleted>
            {accepted.map((accept, i) => (
              <List.Item key={"accept" + i}>
                <List.Icon name={accept.avatar} />
                <List.Content>{accept.fname + " " + accept.lname}</List.Content>
              </List.Item>
            ))}
          </List>
        </Tab.Pane>
      )
    },
    {
      menuItem: `Activities (${activities.length})`,
      render: () => (
        <Tab.Pane attached={false}>
          <List bulleted>
            {activities.map((activity, i) => (
              <List.Item key={"activity" + i}> {activity.activity}</List.Item>
            ))}
          </List>
        </Tab.Pane>
      )
    },
    {
      menuItem: "Accommodations",
      render: () => (
        <Tab.Pane attached={false}>
          <List bulleted>
            <List.Item>{jurnInfo.hotel}</List.Item>
          </List>
        </Tab.Pane>
      )
    }
  ]

  return (
    <div className="phase2">
      <div>
        <h1 className="p2header">{jurnInfo.jname} </h1>
        <em>
          <h3>{jurnInfo.location}</h3>
        </em>
        <h4 className="p2location">
          {moment(jurnInfo.start_date).format("MMM Do, YYYY") + " - "}
          {moment(jurnInfo.end_date).format("MMM Do, YYYY")}
        </h4>

        <Link to={"/Jurne/dashboard/" + jurn_id} className="p2Edit">
          <Button type="button">Edit</Button>
        </Link>
      </div>
      <div className="p2ChecklistAndActivies">
        <div>
          <List className="p2Checklist">
            <Form onSubmit={handleSubmit}>
              <Form.Input
                fluid
                label="add Reminders here..."
                placeholder='ex. "arrange for a petsitter"'
                value={reminder}
                onChange={e => setReminder(e.target.value)}
              />
              <Form.Button>Submit</Form.Button>
            </Form>
            <h5>Reminders</h5>

            {rems.map((rem, i) => (
              <Checkbox
                key={"reminder" + i}
                value={rem.rem}
                label={
                  rem.status === "completed" ? (
                    <span className="completed">
                      <Checkbox
                        value={rem.rem}
                        label={rem.rem}
                        checked={rem.status === "completed"}
                        onChange={e => toggleRem(rem.rem_id, jurn_id, user_id)}
                      />
                    </span>
                  ) : (
                    rem.rem
                  )
                }
                checked={rem.status === "completed"}
                onChange={e => toggleRem(rem.rem_id, jurn_id, user_id)}
              />
            ))}
          </List>
          <Form>
            <Form.Field className="P2filters">
              <Radio
                label="All"
                name="filterRems"
                checked={view === "all" ? true : false}
                onChange={e => changeView("all")}
              />
              <Radio
                label="Active"
                name="filterRems"
                checked={view === "active" ? true : false}
                onChange={e => changeView("active")}
              />
              <Radio
                label="Completed"
                name="filterRems"
                checked={view === "completed" ? true : false}
                onChange={e => changeView("completed")}
              />
            </Form.Field>
            {/* </Form>
          <Form onSubmit={e => clearRems(jurn_id, user_id)}>
            <Button type="submit">Clear Completed</Button>
            <h5> Reminders left: {remsCount}</h5>
          </Form> */}
            <Button type="button" onClick={e => clearRems(jurn_id, user_id)}>
              Clear Completed
            </Button>
            <h5> Reminders left: {remsCount}</h5>
          </Form>
        </div>
        <div className="p2details">
          <h5>
            Jurn
            <span>
              <em>(e)</em>
            </span>{" "}
            Details
          </h5>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </div>
      </div>
    </div>
  )
}
