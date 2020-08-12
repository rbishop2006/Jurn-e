import React, { useState, useEffect } from "react"
import { Form, Button, List, Icon } from "semantic-ui-react"
import { useInvited, useMain, useAside } from "../../hooks"
import "../../styles/phase1/inviteUsers.scss"

export default (props) => {
	const {
		pending,
		accepted,
		declined,
		updateInvited,
		sendInvite,
	} = useInvited()
	const { fetchMain } = useMain()

	const { aUser, delJurn, fetchAside } = useAside()
	const user_id = aUser.user_id

	const jurn_id = props.match.params.jurn_id
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [error, setError] = useState(false)

	function handleInvite(e) {
		e.preventDefault()

		sendInvite(firstName, lastName, jurn_id)
			.then((e) => {
				setFirstName("")
				setLastName("")
				updateInvited(jurn_id)
			})

			.catch((e) => {
				setError(true)
				setFirstName("")
				setLastName("")
				updateInvited(jurn_id)
			})
	}

	function handleDelete(e, jurn_id) {
		//ask about removing prevent default, or other solution
		e.preventDefault()
		delJurn(user_id, jurn_id).then(() => {
			fetchAside()
			fetchMain()
			props.history.push("/Jurne/dashboard")
		})
	}

	useEffect(() => {
		updateInvited(jurn_id)
		setError(false)
	}, [jurn_id, firstName, lastName])

	return (
		<div className="inviteDiv">
			<Form onSubmit={handleInvite}>
				<h3>
					Invite Travelers to go on this Jurn(<em>e</em>)
				</h3>
				<Form.Group className="inviteSect">
					<Form.Input
						error={
							error
								? {
										content:
											"Invitee not found: Please enter a valid first and last name",
										pointing: "above",
								  }
								: false
						}
						fluid
						label="First Name"
						placeholder="ex. Mary"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<Form.Input
						error={error}
						fluid
						label="Last Name"
						placeholder="ex. Smith"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</Form.Group>

				<Button id="submitInvite" type="submit">
					<span>
						Invite <Icon name="users" />
					</span>
				</Button>
			</Form>

			<List>
				<h3>Pending:</h3>
				{pending.map((pend, i) => (
					<List.Item key={"pending" + i}>
						<List.Icon name={pend.avatar} />
						<List.Content>{pend.fname + " " + pend.lname}</List.Content>
					</List.Item>
				))}
			</List>
			<List>
				<h3>Accepted:</h3>
				{accepted.map((accept, i) => (
					<List.Item key={"accept" + i}>
						<List.Icon name={accept.avatar} />
						<List.Content>{accept.fname + " " + accept.lname}</List.Content>
					</List.Item>
				))}
			</List>
			<List>
				<h3>Declined:</h3>
				{declined.map((decl, i) => (
					<List.Item key={"decline" + i}>
						<List.Icon name={decl.avatar} />
						<List.Content>{decl.fname + " " + decl.lname}</List.Content>
					</List.Item>
				))}
			</List>
			<Button
				type="button"
				className="deleteJurn"
				onClick={(e) => handleDelete(e, jurn_id)}
			>
				<span>
					Remove Jurn(<em>e</em>)
					<Icon name="remove" />
				</span>
			</Button>
		</div>
	)
}
