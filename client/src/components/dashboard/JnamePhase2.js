import React, { useEffect, useState } from "react"
import { List, Checkbox, Tab, Form, Radio, Button } from "semantic-ui-react"
import { usePhase2, useRems } from "../../hooks"
import { Link } from "react-router-dom"
import "../../styles/phase2.scss"
import moment from "moment"

export default props => {
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
  console.log(jurnInfo)

  function handleSubmit(e) {
    e.preventDefault()
    addRem(reminder, jurn_id)
    setReminder("")
  }
  const [view, setView] = useState("all")

  function changeView(status) {
    setView(status)
    filterRems(status, jurn_id)
  }

  useEffect(() => {
    updatePhase2(props.match.params.jurn_id)
    updateRems(props.match.params.jurn_id)
  }, [props.match.params.jurn_id, reminder])

  const panes = [
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
    },
    {
      menuItem: "Flights",
      render: () => (
        <Tab.Pane attached={false}>
          <p>FLIGHTS lorem ipsum dolor</p>
          <p>FLIGHTS lorem ipsum dolor</p>
          <p>FLIGHTS lorem ipsum dolor</p>
          {/* <Flights history={props.history} /> */}
        </Tab.Pane>
      )
    },
    {
      menuItem: "Rental Cars",
      render: () => (
        <Tab.Pane attached={false}>
          <p>RENTAL CARS lorem ipsum dolor</p>
          <p>RENTAL CARS lorem ipsum dolor</p>
          <p>RENTAL CARS lorem ipsum dolor</p>
          {/* <RentalCars history={props.history} /> */}
        </Tab.Pane>
      )
    }
  ]

  return (
    <div className="phase2">
      <div>
        <h1 className="p2header">
          {jurnInfo.jname}
          <em>
            <h3>{jurnInfo.location}</h3>
          </em>
          <h4 className="p2location">
            {moment(jurnInfo.start_date).format("MMM Do, YYYY") + " - "}
            {moment(jurnInfo.end_date).format("MMM Do, YYYY")}
          </h4>
        </h1>

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
                        onChange={e => toggleRem(rem.rem_id, jurn_id)}
                      />
                    </span>
                  ) : (
                    rem.rem
                  )
                }
                checked={rem.status === "completed"}
                onChange={e => toggleRem(rem.rem_id, jurn_id)}
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
            <Button type="button" onClick={e => clearRems(jurn_id)}>
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
