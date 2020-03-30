import React, { useEffect, useState } from "react"
import { List, Checkbox, Tab, Form, Radio, Button } from "semantic-ui-react"
import { usePhase2 } from "../../hooks"
import { useRems } from "../../hooks"

export default props => {
  const [item, setItem] = useState("")
  const { jurnInfo, reminders, updatePhase2 } = usePhase2()
  const {
    rems,
    remsCount,
    addRem,
    // remComp,
    toggleRem,
    filterRems,
    clearRems,
    updateRems
  } = useRems()
  const jurn_id = props.match.params.jurn_id

  function handleSubmit(e) {
    e.preventDefault()
    addRem(item, jurn_id)
    setItem("")
  }
  const [view, setView] = useState("all")

  function changeView(status) {
    setView(status)
    filterRems(status, jurn_id)
  }

  useEffect(() => {
    updatePhase2(props.match.params.jurn_id)
  }, [props.match.params.jurn_id])

  useEffect(() => {
    updateRems(props.match.params.jurn_id)
  }, [props.match.params.jurn_id])

  const panes = [
    {
      menuItem: "Hotels",
      render: () => (
        <Tab.Pane attached={false}>
          <p>HOTELS lorem ipsum dolor</p>
          <p>HOTELS lorem ipsum dolor</p>
          <p>HOTELS lorem ipsum dolor</p>
          {/* <Hotels history={props.history} /> */}
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
    },
    {
      menuItem: "Restaurants",
      render: () => (
        <Tab.Pane attached={false}>
          <p>RESTAURANTS lorem ipsum dolor</p>
          <p>RESTAURANTS lorem ipsum dolor</p>
          <p>RESTAURANTS lorem ipsum dolor</p>
          {/* <Restaurants history={props.history} /> */}
        </Tab.Pane>
      )
    }
  ]

  return (
    <div className="phase2">
      <h1 className="p2header">{jurnInfo.jname}</h1>
      <h3 className="p2location">{jurnInfo.location}</h3>
      <div className="p2TodoAndChecklist">
        <List className="p2Checklist">
          <Form onSubmit={handleSubmit}>
            <Form.Input
              fluid
              label=""
              placeholder=""
              value={item}
              onChange={e => setItem(e.target.value)}
            />
            <Form.Button>Submit</Form.Button>
          </Form>
          <h5>add Reminders/Todos</h5>

          {rems.map((rem, i) => (
            <Checkbox
              key={"reminder" + i}
              value={rem.rem}
              label={rem.rem}
              onChange={e => toggleRem(rem.rem_id, jurn_id)}
            />
          ))}
        </List>
        <Form>
          <Form.Field>
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
            <Radio
              label="All"
              name="filterRems"
              checked={view === "all" ? true : false}
              onChange={e => changeView("all")}
            />
          </Form.Field>
        </Form>
        <Button type="button" onClick={e => clearRems(jurn_id)}>
          Clear Completed
        </Button>
        <h5> Reminders and Todos left: {remsCount}</h5>
      </div>
      <div className="p2details">
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />

        <h5>Activities</h5>

        <List bulleted>
          <List.Item>
            <List.Content>ACTIVITIES lorem ipsum dolor sit amet</List.Content>
          </List.Item>
          <List.Item>
            <List.Content>ACTIVITIES lorem ipsum dolor sit amet</List.Content>
          </List.Item>
          <List.Item>
            <List.Content>ACTIVITIES lorem ipsum dolor sit amet</List.Content>
          </List.Item>
          <List.Item>
            <List.Content>ACTIVITIES lorem ipsum dolor sit amet</List.Content>
          </List.Item>
          <List.Item>
            <List.Content>ACTIVITIES lorem ipsum dolor sit amet</List.Content>
          </List.Item>
          <List.Item>
            <List.Content>ACTIVITIES lorem ipsum dolor sit amet</List.Content>
          </List.Item>
        </List>
      </div>
    </div>
  )
}
