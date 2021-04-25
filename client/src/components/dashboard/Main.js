import React, { useEffect } from "react"
import { Card, Image, Icon } from "semantic-ui-react"
import { useMain } from "../../hooks"
import { Link } from "react-router-dom"
import "../../styles/dashboard/Main.scss"
import moment from "moment"

export default (props) => {
	const { jurns, fetchMain } = useMain()

	useEffect(() => {
		fetchMain()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<section>
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
								<Card.Header className="nameAndEdit">{jurn.jname}</Card.Header>
								<Card.Meta id="location">{jurn.location}</Card.Meta>
								<Card.Meta>
									{jurn.start_date &&
										moment(jurn.start_date).format("MMM Do, YYYY") + " - "}
									{jurn.end_date &&
										moment(jurn.end_date).format("MMM Do, YYYY")}
								</Card.Meta>
								<Card.Meta>{`People going: ` + jurn.going_count}</Card.Meta>
								<Card.Meta>{`Pending invites: ` + jurn.pend_count}</Card.Meta>
								<Card.Meta>{`Activities planned: ` + jurn.act_count}</Card.Meta>

								<Card.Meta>{`My Reminders Left: ` + jurn.rem_count}</Card.Meta>
								<Link
									className="p1Edit"
									to={"/Jurne/dashboard/" + jurn.jurn_id}
								>
									<span>
										Edit <Icon name="pencil" />
									</span>
								</Link>
							</Card.Content>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
