import React, { useEffect, useState } from "react"
import { List, Checkbox, Form, Radio, Button, Icon } from "semantic-ui-react"
import { useAside, usePhase2, useRems } from "../../hooks"
import "../../styles/phase2/Phase2Reminders.scss"
import validator from "validator"

export default (props) => {
	const { aUser } = useAside()

	const [reminder, setReminder] = useState("")

	const { updatePhase2 } = usePhase2()
	const {
		rems,
		remsCount,
		addRem,
		toggleRem,
		filterRems,
		clearRems,
		updateRems,
	} = useRems()

	const jurn_id = props.match.params.jurn_id
	const user_id = aUser.user_id

	function handleSubmit(e) {
		e.preventDefault()
		let valid = true

		if (validator.isEmpty(reminder)) {
			valid = false
		}
		if (valid) {
			addRem(reminder, jurn_id, user_id)
			setReminder("")
		}
	}

	const [view, setView] = useState("all")

	function changeView(status) {
		setView(status)
		filterRems(status, jurn_id, user_id)
	}

	useEffect(() => {
		updatePhase2(jurn_id)
		updateRems(jurn_id, user_id)
	}, [jurn_id, user_id, reminder])

	return (
		<div className="p2remindersForm">
			<h4>
				My Jurn(<em>e</em>) Reminders
			</h4>
			<h4> My Reminders left: {remsCount}</h4>
			<List className="p2Checklist">
				<Form onSubmit={handleSubmit}>
					<Form.Input
						fluid
						label="add Reminders here..."
						placeholder='ex. "arrange for a petsitter"'
						value={reminder}
						onChange={(e) => setReminder(e.target.value)}
					/>
				</Form>
				<div className="p2ReminderCheckbox">
					{rems.map((rem, i) => (
						<Checkbox
							key={"reminder" + i}
							value={rem.rem}
							label={
								rem.status === "completed" ? (
									<span className="completed">
										<Checkbox
											value={rem.rem}
											label={rem.rem}
											checked={rem.status === "completed"}
											onChange={(e) => toggleRem(rem.rem_id, jurn_id, user_id)}
										/>
									</span>
								) : (
									rem.rem
								)
							}
							checked={rem.status === "completed"}
							onChange={(e) => toggleRem(rem.rem_id, jurn_id, user_id)}
						/>
					))}
				</div>
			</List>
			<Form className="p2filterAndClear">
				<Form.Field className="P2filters">
					<Radio
						label="All"
						name="filterRems"
						checked={view === "all" ? true : false}
						onChange={(e) => changeView("all")}
					/>
					<Radio
						label="Active"
						name="filterRems"
						checked={view === "active" ? true : false}
						onChange={(e) => changeView("active")}
					/>
					<Radio
						label="Completed"
						name="filterRems"
						checked={view === "completed" ? true : false}
						onChange={(e) => changeView("completed")}
					/>
				</Form.Field>
			</Form>
			<Form>
				<Button type="button" onClick={(e) => clearRems(jurn_id, user_id)}>
					Clear Completed
					<Icon name="remove circle" />
				</Button>
			</Form>
		</div>
	)
}
