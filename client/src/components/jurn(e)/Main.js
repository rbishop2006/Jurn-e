import React from "react"
import Header from "./Header"
import { Card, Image, Menu } from "semantic-ui-react"
import { useDashboard } from "../../hooks"

export default props => {
  const { jurns, reminders } = useDashboard()

  return (
    <main>
      <Header />
      <div className="dashMain">
        {/* This is where we display info about each Jurn in the database */}
        <div className="cardDiv">
          {jurns.map((each, i) => (
            <Card centered fluid key={"jurn" + i}>
              <Image src="https://place-hold.it/800x200" />
              <Card.Content>
                <Card.Header>{each.jname}</Card.Header>
                <Card.Meta>{each.location}</Card.Meta>
                <Card.Meta>{"People going: " + 3}</Card.Meta>
                <h5>Reminders</h5>
                {reminders.map((each, i) => (
                  <Menu vertical className="menu" key={"reminder" + i}>
                    <Menu.Item name={each.reminder} active={true} />
                  </Menu>
                ))}
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
