import React, { useState } from "react"
import { useAuth } from "react-auth"
import { Link, useHistory } from "react-router-dom"
import { Button, Form, Image, Segment } from "semantic-ui-react"
import "../../styles/LoginRegister.scss"

export default function Login() {
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
				history.push("/Dashboard/main")
			})
			.catch((e) => {
				console.error(e)
				setError(true)
				setPassword("")
				setUsername("")
			})
	}

	return (
		<Segment padded basic className={"logInRegister"}>
			<Image as={Link} to={"/"} src={"/JurnEase-logo.png"} alt={"Jurn(ease)"} />
			<Form onSubmit={handleLogin} size={"big"}>
				<Form.Input
					type={"email"}
					className={"mt-4"}
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
					error={error}
					label={"Password"}
					placeholder={"password"}
					value={password}
					type={"password"}
					onChange={(_, { value }) => setPassword(value)}
				/>
				<Button type="submit">Log in</Button>
				<Segment basic className="flex jc-center">
					<p>New user?</p>
					<Link to="/Register">Register Here</Link>
				</Segment>
			</Form>
		</Segment>
	)
}
