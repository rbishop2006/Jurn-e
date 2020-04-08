import React, { useEffect } from "react"
import { Card, Image, Button, Icon } from "semantic-ui-react"
import { useMain } from "../../hooks"
import { Link } from "react-router-dom"
import moment from "moment"

export default props => {
  const { jurns, get } = useMain()

  useEffect(() => {
    get()
  }, [])

  return (
    <main>
      <div className="dashMain">
        {/* This is where we display info about each Jurn in the database */}
        <div className="cardDiv">
          {jurns.map((jurn, i) => (
            <Card className="cards" key={"jurn" + i} centered>
              <Image
                className="photos"
                src={jurn.photo}
                alt="Jurn(ease) trip photo"
              />
              <Card.Content>
                <Card.Header className="nameAndEdit">
                  {jurn.jname}
                  <Link to={"/Jurne/dashboard/" + jurn.jurn_id}>
                    <Button type="button">
                      <span>
                        J(<em>e</em>) <Icon name="pencil" />
                      </span>
                    </Button>
                  </Link>
                </Card.Header>
                <Card.Meta id="location">{jurn.location}</Card.Meta>
                <Card.Meta>
                  {moment(jurn.start_date).format("MMM Do, YYYY") + " - "}
                  {moment(jurn.end_date).format("MMM Do, YYYY")}
                </Card.Meta>
                <Card.Meta>{`People going: ` + jurn.going_count}</Card.Meta>
                <Card.Meta>{`Pending invites: ` + jurn.pend_count}</Card.Meta>
                <Card.Meta>{`Activities planned: ` + jurn.act_count}</Card.Meta>

                <Card.Meta>{`My Reminders Left: ` + jurn.rem_count}</Card.Meta>
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
