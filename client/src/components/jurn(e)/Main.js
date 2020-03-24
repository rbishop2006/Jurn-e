import React from "react"
import Header from "./Header"
import { Card, Image } from "semantic-ui-react"
import { useDashboard } from "../../hooks"

export default props => {
  // const { jurns } = useDashboard()

  return (
    <main>
      <Header />
      <div className="dashMain">
        {/* This is where we dispaly info about the Jurn */}
        {/* We will have to map through all the Jurns somehow */}
        <div className="cardDiv">
          {/* {jurns.map((jurn, i) => {
            ;<Card centered fluid key={"jurn" + i}>
              <Image src="https://place-hold.it/800x200" />
              <Card.Content>
                <Card.Header>{jurn.jname}</Card.Header>
                <Card.Meta>{jurn.location}</Card.Meta>
                <Card.Meta>{"People going: " + users.length}</Card.Meta>
              </Card.Content>
            </Card>
          })} */}

          {/* {jurns.map((jurn,i) => {
            <Card centered fluid key={"jurn" + i}>
            <Image src="https://place-hold.it/800x200" />
            <Card.Content>
              <Card.Header>{jurn.jname}</Card.Header>
              <Card.Meta>{jurn.location}</Card.Meta>
              <Card.Meta>{"People going: " + users.length}</Card.Meta>
            </Card.Content>
          </Card>
          })} */}

          <Card centered fluid>
            <Image src="https://place-hold.it/800x200" />
            <Card.Content>
              <Card.Header>Jurn Name</Card.Header>
              <Card.Meta>Jurn Location</Card.Meta>
              <Card.Meta>Familes going: 1</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <Card.Meta>Total people going: 4</Card.Meta>
            </Card.Content>
          </Card>
          <Card centered fluid>
            <Image src="https://place-hold.it/800x200" />
            <Card.Content>
              <Card.Header>Jurn Name 1</Card.Header>
              <Card.Meta>Jurn Location</Card.Meta>
              <Card.Meta>Familes going: 3</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <Card.Meta>Total people going: 14</Card.Meta>
            </Card.Content>
          </Card>
          <Card centered fluid>
            <Image src="https://place-hold.it/800x200" />
            <Card.Content>
              <Card.Header>Jurn Name 2</Card.Header>
              <Card.Meta>Jurn Location</Card.Meta>
              <Card.Meta>Familes going: 4</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <Card.Meta>Total people going: 34</Card.Meta>
            </Card.Content>
          </Card>
        </div>
      </div>
    </main>
  )
}
