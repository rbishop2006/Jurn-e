import React, { useState } from "react"
import { useAuth } from "react-auth"
import { Link, useHistory } from "react-router-dom"
import { Button, Form, Menu } from "semantic-ui-react"
import "../../styles/LoginRegister.scss"

export default function Login(props) {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState(false)
	const { signin } = useAuth()
	const history = useHistory()

	// TODO - maybe do an async function here??
	function handleLogin(e) {
		e.preventDefault()
		signin(username, password)
			.then((profile) => {
				history.push("/JurnEase/main")
			})
			.catch((e) => {
				console.error(e)
				console.log(e)
				setError(true)
				setPassword("")
				setUsername("")
			})
	}

	return (
		<Form onSubmit={handleLogin} size={"big"}>
			<Form.Input
				inline
				error={
					error
						? { content: "Invalid username or password", pointing: "below" }
						: false
				}
				label={"Email"}
				placeholder={"ex. JohnSmith@email.com"}
				value={username}
				onChange={(_, { value }) => setUsername(value)}
			/>
			<Form.Input
				inline
				error={error}
				label={"Password"}
				placeholder={"password"}
				value={password}
				type={"password"}
				onChange={(_, { value }) => setPassword(value)}
			/>
			<Button type="submit">Log in</Button>
			<div className="linkDiv">
				<p>New user?</p>
				<Link to="/register">Register Here</Link>
			</div>
		</Form>
	)
}
