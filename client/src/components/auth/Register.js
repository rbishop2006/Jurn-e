import React, { useState } from "react"
import { api, useAuth } from "react-auth"
import { Link, useHistory } from "react-router-dom"
import validator from "validator"
import { Button, Form, Segment, Image } from "semantic-ui-react"
import "../../styles/LoginRegister.scss"

export default function Register() {
	const { signin } = useAuth()
	const [username, setUsername] = useState("")
	const [usernameError, setUsernameError] = useState(false)
	const [fname, setFname] = useState("")
	const [fnameError, setFnameError] = useState(false)
	const [lname, setLname] = useState("")
	const [lnameError, setLnameError] = useState(false)
	const [password, setPassword] = useState("")
	const [passwordError, setPasswordError] = useState(false)
	const [confirm, setConfirm] = useState("")
	const [confirmError, setConfirmError] = useState(false)
	const history = useHistory()

	const handleRegister = async (e) => {
		e.preventDefault()
		let valid = true

		if (!validator.isEmail(username)) {
			valid = false
			setUsernameError(true)
		}

		if (!validator.isAlpha(fname, "en-US")) {
			valid = false
			setFnameError(true)
		}

		if (!validator.isAlpha(lname, "en-US")) {
			valid = false
			setLnameError(true)
		}

		if (!validator.isLength(password, { min: 8, max: 30 })) {
			valid = false
			setPasswordError(true)
		}

		if (!validator.equals(confirm, password)) {
			valid = false
			setConfirmError(true)
		}

		if (valid) {
			await api.post("/register", { username, fname, lname, password })

			await signin(username, password)

			return history.push("/Dashboard/main")
		}
	}

	return (
		<Segment padded basic className={"logInRegister"}>
			<Image as={Link} to={"/"} src={"/JurnEase-logo.png"} alt={"Jurn(ease)"} />
			<Form onSubmit={handleRegister} size={"big"}>
				<Form.Input
					className={"mt-4"}
					type={"email"}
					error={
						usernameError && {
							content: `Please enter valid email address`,
							pointing: "below",
						}
					}
					label={"Email"}
					placeholder={"ex. JohnSmith@email.com"}
					value={username}
					onChange={(_, { value }) => setUsername(value)}
				/>
				<Form.Input
					type={"text"}
					error={
						fnameError && {
							content: `Can't be blank & can only contain letters`,
							pointing: "below",
						}
					}
					label={"First Name"}
					placeholder={"ex. John"}
					value={fname}
					onChange={(_, { value }) => setFname(value)}
				/>
				<Form.Input
					type={"text"}
					error={
						lnameError && {
							content: `Can't be blank & can only contain letters`,
							pointing: "below",
						}
					}
					label={"Last Name"}
					placeholder={"ex. Smith"}
					value={lname}
					onChange={(_, { value }) => setLname(value)}
				/>
				<Form.Input
					type={"password"}
					error={
						passwordError && {
							content: `Must be between 8 and 30 characters`,
							pointing: "below",
						}
					}
					label={"Password"}
					placeholder={"Create a password"}
					value={password}
					onChange={(_, { value }) => setPassword(value)}
				/>
				<Form.Input
					type={"password"}
					error={
						confirmError && {
							content: `Must match password`,
							pointing: "below",
						}
					}
					label={"Confirm Password"}
					placeholder={"Re-enter password"}
					value={confirm}
					onChange={(_, { value }) => setConfirm(value)}
				/>
				<Button type="submit">Register</Button>
				<Segment basic className="flex jc-center">
					<p>
						Already a Jurn(<em>ease</em>) member?
					</p>
					<Link to="/Login">Click Here</Link>
				</Segment>
			</Form>
		</Segment>
	)
}
