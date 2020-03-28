import React, { useEffect } from "react"
import { List, Checkbox, Tab } from "semantic-ui-react"
import { usePhase2, useDashboard } from "../../hooks"

export default props => {
  const jurns = useDashboard()
  const { jname, location, reminders, updatePhase2 } = usePhase2()

  const jurn_id = props.match.params.jurn_id

  useEffect(() => {
    updatePhase2(props.match.params.jurn_id)
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
      <h1 className="p2header">{jname.jname}</h1>
      <h3 className="p2location">{location.location}</h3>
      <div className="p2TodoAndChecklist">
        <List className="p2Checklist">
          <h5>Reminders and Todos</h5>
          {reminders.map((reminder, i) => (
            <Checkbox
              key={"reminder" + i}
              value={reminder.reminder}
              label={reminder.reminder}
            />
          ))}
        </List>
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
