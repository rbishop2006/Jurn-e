import React, { useEffect } from "react"
import { Button, Icon, Tab } from "semantic-ui-react"
import { Link } from "react-router-dom"
import InviteUsers from "./InviteUsers"
import PhotoPicker from "./PhotoPicker"
import DatesPicker from "./DatesPicker"
import LocationPicker from "./LocationPicker"
import HotelPicker from "./HotelPicker"
import Activities from "./Activities"
import { usePhase1 } from "../../hooks"
import "../../styles/phase1/phase1.scss"

export default (props) => {
	const { jname, updatePhase1 } = usePhase1()
	const jurn_id = props.match.params.jurn_id

	useEffect(() => {
		updatePhase1(props.match.params.jurn_id)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.match.params.jurn_id])

	const panes = [
		{
			menuItem: `Photo`,
			render: () => (
				<Tab.Pane attached={false}>
					<PhotoPicker match={props.match} />
				</Tab.Pane>
			),
		},
		{
			menuItem: `Dates`,
			render: () => (
				<Tab.Pane attached={false}>
					<DatesPicker match={props.match} />
				</Tab.Pane>
			),
		},
		{
			menuItem: `Locations`,
			render: () => (
				<Tab.Pane attached={false}>
					<LocationPicker match={props.match} />
				</Tab.Pane>
			),
		},
		{
			menuItem: `Accommodations`,
			render: () => (
				<Tab.Pane attached={false}>
					<HotelPicker match={props.match} />
				</Tab.Pane>
			),
		},

		{
			menuItem: `Activities`,
			render: () => (
				<Tab.Pane attached={false}>
					<Activities match={props.match} />
				</Tab.Pane>
			),
		},
	]

	return (
		<div className="phase1">
			<h1 className="p1Header">{jname.jname}</h1>
			<div className="inviteUsers">
				<InviteUsers match={props.match} history={props.history} />
			</div>
			<div className="selectionsMenu">
				<div className="selectionTop">
					<h4>
						Jurn(<em>e</em>) Planning
					</h4>
					<Tab
						className="menuDiv2"
						menu={{ secondary: true, pointing: true }}
						panes={panes}
					/>
				</div>
				<Link className="toPhase2" to={`/Dashboard/Jurne/${jurn_id}`}>
					<Button type="submit">
						<span>
							<Icon name="arrow right" />
							My Jurn(<em>e</em>)
						</span>
					</Button>
				</Link>
			</div>
		</div>
	)
}
