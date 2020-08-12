import React, { useEffect } from "react"
import { List, Tab, Button, Icon } from "semantic-ui-react"
import { useAside } from "../../hooks"
import { usePhase2, useInvited } from "../../hooks"
import { Link } from "react-router-dom"
import "../../styles/phase2/Phase2Details.scss"

export default (props) => {
	const { aUser } = useAside()

	const { accepted, updateInvited } = useInvited()

	const { jurnInfo, updatePhase2, activities } = usePhase2()

	const jurn_id = props.match.params.jurn_id
	const user_id = aUser.user_id

	useEffect(() => {
		updatePhase2(jurn_id)
		updateInvited(jurn_id)
	}, [jurn_id, user_id])

	const panes = [
		{
			menuItem: `People going: (${accepted.length})`,
			render: () => (
				<Tab.Pane attached={false}>
					<List bulleted>
						{accepted.map((accept, i) => (
							<List.Item key={"accept" + i}>
								<List.Icon name={accept.avatar} />
								<List.Content>
									<p>{`${accept.fname} ${accept.lname}`}</p>
									<a
										href={`tel:${accept.phone && accept.phone}`}
										className="phoneNumber"
									>
										ph: {accept.phone && accept.phone}
									</a>
									<Icon name="phone" />
								</List.Content>
							</List.Item>
						))}
					</List>
				</Tab.Pane>
			),
		},
		{
			menuItem: `Activities (${activities.length})`,
			render: () => (
				<Tab.Pane attached={false}>
					<List bulleted>
						{activities.map((activity, i) => (
							<List.Item key={"activity" + i}> {activity.activity}</List.Item>
						))}
					</List>
				</Tab.Pane>
			),
		},
		{
			menuItem: "Accommodations",
			render: () => (
				<Tab.Pane attached={false}>
					<List bulleted>
						<List.Item>{jurnInfo.hotel}</List.Item>
					</List>
				</Tab.Pane>
			),
		},
	]

	return (
		<div className="p2Details">
			<div>
				<h4>
					Jurn(<em>e</em>) Details
				</h4>
				<h4 className="p2location">{jurnInfo.location}</h4>
				<Tab
					className="menuDiv"
					menu={{ secondary: true, pointing: true }}
					panes={panes}
				/>
			</div>
			<Link to={"/Jurne/dashboard/" + jurn_id} className="p2Edit">
				<Button id="editButton" type="button">
					<span>
						Edit <Icon name="pencil" />
					</span>
				</Button>
			</Link>
		</div>
	)
}
