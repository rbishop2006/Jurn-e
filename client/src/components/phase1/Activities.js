import React, { useState, useEffect } from "react"
import { Form, Button, Radio, Checkbox, Icon } from "semantic-ui-react"
import { usePhase1, useActs } from "../../hooks"
import "../../styles/phase1/activities.scss"
import validator from "validator"

export default (props) => {
	const jurn_id = props.match.params.jurn_id
	const [activity, setActivity] = useState("")
	const [view, setView] = useState("all")
	const { updatePhase1 } = usePhase1()
	const {
		acts,
		actsCount,
		addAct,
		toggleAct,
		filterActs,
		clearActs,
		updateActs,
	} = useActs()

	function handleActivity(e) {
		e.preventDefault()

		let valid = true

		if (validator.isEmpty(activity)) {
			valid = false
		}
		if (valid) {
			addAct(activity, jurn_id)
		}
		setActivity("")
	}

	function changeView(status) {
		setView(status)
		filterActs(status, jurn_id)
	}

	useEffect(() => {
		updatePhase1(jurn_id)
		updateActs(jurn_id)
	}, [jurn_id])

	return (
		<div className="activitiesDiv">
			<Form onSubmit={handleActivity}>
				{/* <h3>Activities</h3> */}
				<h4> Activities left: {actsCount}</h4>
				<Form.Group className="activitySect">
					<Form.Input
						fluid
						label="add Activities here..."
						placeholder='ex. "drinks on the patio after dinner"'
						value={activity}
						onChange={(e) => setActivity(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className="actCheckbox">
					<Form.Field>
						{acts.map((act, i) => (
							<Checkbox
								key={"activity" + i}
								value={act.act}
								label={
									act.status === "completed" ? (
										<span className="completed">
											<Checkbox
												value={act.act}
												label={act.act}
												checked={act.status === "completed"}
												onChange={(e) => toggleAct(act.act_id, jurn_id)}
											/>
										</span>
									) : (
										act.act
									)
								}
								checked={act.status === "completed"}
								onChange={(e) => toggleAct(act.act_id, jurn_id)}
							/>
						))}
					</Form.Field>
				</Form.Group>
				<Form.Group className="p1filterAndClear">
					<Form.Field className="p1ActFilters">
						<Radio
							label="All"
							name="filterActs"
							checked={view === "all" ? true : false}
							onChange={(e) => changeView("all")}
						/>
						<Radio
							label="Active"
							name="filterActs"
							checked={view === "active" ? true : false}
							onChange={(e) => changeView("active")}
						/>
						<Radio
							label="Completed"
							name="filterActs"
							checked={view === "completed" ? true : false}
							onChange={(e) => changeView("completed")}
						/>
					</Form.Field>
				</Form.Group>
			</Form>
			<Form className="clear" onSubmit={(e) => clearActs(jurn_id)}>
				<Button className="clearCompleted" type="submit">
					<span>
						Clear Completed
						<Icon name="remove circle" />
					</span>
				</Button>
			</Form>
		</div>
	)
}
