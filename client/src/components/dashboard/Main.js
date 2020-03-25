import React from "react"
import { Card, Image, List } from "semantic-ui-react"
import { useDashboard } from "../../hooks"
import { Link } from "react-router-dom"

export default props => {
  const { jurns, reminders } = useDashboard()

  return (
    <main>
      <div className="dashMain">
        {/* This is where we display info about each Jurn in the database */}
        <div className="cardDiv">
          {jurns.map((each, i) => (
            <Link key={"jurn" + i} to={"/Jurne/dashboard/" + each.jname}>
              <Card centered fluid>
                <Image src="https://place-hold.it/800x200" />
                <Card.Content>
                  <Card.Header>{each.jname}</Card.Header>
                  <Card.Meta>{each.location}</Card.Meta>
                  <Card.Meta>{"People going: " + 3}</Card.Meta>
                  <Card.Header textAlign="center">Reminders</Card.Header>
                  <List divided verticalAlign="middle">
                    {reminders.map((each, i) => (
                      <List.Item key={"reminder" + i}>
                        {each.reminder}
                      </List.Item>
                    ))}
                  </List>
                </Card.Content>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
