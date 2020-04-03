import React, { useEffect } from "react"
import { Card, Image } from "semantic-ui-react"
import { useMain, useRems } from "../../hooks"
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
            <Link
              key={"jurn" + i}
              to={"/Jurne/dashboard/final/" + jurn.jurn_id}
            >
              <Card centered>
                <Image src="https://place-hold.it/200x200" />
                <Card.Content>
                  <Card.Header>{jurn.jname}</Card.Header>
                  <Card.Meta>{jurn.location}</Card.Meta>
                  <Card.Meta>
                    {moment(jurn.start_date).format("MMM Do, YYYY") + " - "}
                    {moment(jurn.end_date).format("MMM Do, YYYY")}
                  </Card.Meta>
                  <Card.Meta>{`People going: ` + jurn.going_count}</Card.Meta>
                  <Card.Meta>{`Pending invites: ` + jurn.pend_count}</Card.Meta>
                  <Card.Meta>
                    {`Activities planned: ` + jurn.act_count}
                  </Card.Meta>

                  <Card.Meta>{`Reminders Left: ` + jurn.rem_count}</Card.Meta>
                </Card.Content>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
