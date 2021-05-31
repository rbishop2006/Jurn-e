import React, { useState } from "react"
import { Button, Form, Icon } from "semantic-ui-react"
import { useMain, useAside } from "../../hooks"
import validator from "validator"
import { Link } from "react-router-dom"
import "../../styles/dashboard/Header.scss"

export default (props) => {
	const { sendJurn, fetchMain } = useMain()
	const { fetchAside } = useAside()
	const { aUser } = useAside()
	const [newJurn, setNewJurn] = useState("")

	// Function to handle submitting a new Jurn from the below form

	function handleSubmit(e) {
		e.preventDefault()
		let valid = true

		if (validator.isEmpty(newJurn)) {
			valid = false
		}
		if (valid) {
			sendJurn(aUser.user_id, newJurn).then((jurnId) => {
				fetchMain()
				fetchAside()
				props.history.push(`/Dashboard/Jurne/${jurnId}/planning`)
			})
		}
		setNewJurn("")
	}

	return (
		<header>
			<Link to="/Dashboard/Main">
				<img src="/JurnEase-logo.png" alt="Jurn(ease) logo"></img>
			</Link>
			<Form onSubmit={handleSubmit} className="create">
				<Form.Group>
					<Form.Field>
						<label htmlFor="newJurn">
							create new Jurn(<em>e</em>)s here...
						</label>
						<input
							id="newJurn"
							value={newJurn}
							type="text"
							onChange={(e) => setNewJurn(e.target.value)}
							placeholder="ex. Cancun 2020"
						/>
						<Button type="submit">
							Create Jurn(<em>e</em>)
						</Button>
					</Form.Field>
				</Form.Group>
			</Form>
			<Link to="/Dashboard/main">
				<Button type="button">
					<span>
						My Jurn(<em>e</em>)s <Icon name="home" />
					</span>
				</Button>
			</Link>
		</header>
	)
}
