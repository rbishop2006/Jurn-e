import React from "react"
import { Card, Image, List } from "semantic-ui-react"
import { useDashboard } from "../../hooks"
import { Link } from "react-router-dom"

export default props => {
  const { jurns } = useDashboard()

  return (
    <main>
      <div className="dashMain">
        {/* This is where we display info about each Jurn in the database */}
        <div className="cardDiv">
          {jurns.map((jurn, i) => (
            <Link key={"jurn" + i} to={"/Jurne/dashboard/" + jurn.id}>
              <Card centered fluid>
                <Image src="https://place-hold.it/800x200" />
                <Card.Content>
                  <Card.Header>{jurn.name}</Card.Header>
                  <Card.Meta>{jurn.location}</Card.Meta>
                  <Card.Meta>{"People going: " + 3}</Card.Meta>
                  <Card.Header textAlign="center">Reminders</Card.Header>
                  <List divided verticalAlign="middle">
                    {jurn.reminders.map((reminder, i) => (
                      <List.Item key={"reminder" + i}>{reminder}</List.Item>
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
