import React from "react"
import Header from "./Header"
import { Card, Image } from "semantic-ui-react"
import { useDashboard } from "../../hooks"

export default props => {
  const { jurns } = useDashboard()

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
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
