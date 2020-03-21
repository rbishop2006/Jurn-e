import React, { useState } from "react"
import { api, useAuth } from "react-auth"
import { Link } from "react-router-dom"
// import validator from "validator"
import { Button, Form } from "semantic-ui-react"
// import "../../styles/Login.css"

export default props => {
  const { signin } = useAuth()
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirm, setConfirm] = useState("")
  const [confirmError, setConfirmError] = useState("")

  function handleRegister(e) {
    e.preventDefault()
    // let valid = true

    // if (!validator.isAlpha(username, "en-US")) {
    //   valid = false
    //   setUsernameError(` -- Can't be blank & can only contain letters`)
    // } else {
    //   setUsernameError("")
    // }

    // if (!validator.isAlphanumeric(password, "en-US")) {
    //   valid = false
    //   setPasswordError(` -- Can't be blank`)
    // } else {
    //   setPasswordError("")
    // }

    // if (!validator.equals(confirm, password)) {
    //   valid = false
    //   setConfirmError(` -- Must match password`)
    // } else {
    //   setConfirmError("")
    // }

    // if (valid) {
    api.post("/register", { email, password }).then(data => {
      signin(email, password).then(() => {
        props.history.push("/jurn(e)/dashboard")
      })
    })
  }
  // }

  return (
    <div className="registerDiv">
      <h1>Register</h1>
      <Form onSubmit={handleRegister}>
        <Form.Field>
          <label className={emailError ? "error" : ""} htmlFor="email">
            Email {emailError && emailError}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            className={emailError ? "errorBox" : ""}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter you email"
          />
        </Form.Field>
        <Form.Field>
          <label className={passwordError ? "error" : ""} htmlFor="password">
            Password {passwordError && passwordError}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            className={passwordError ? "errorBox" : ""}
            onChange={e => setPassword(e.target.value)}
            placeholder="Create a password"
          />
        </Form.Field>
        <Form.Field>
          <label className={confirmError ? "error" : ""} htmlFor="confirm">
            Confirm Password {confirmError && confirmError}
          </label>
          <input
            id="confirm"
            type="password"
            value={confirm}
            className={confirmError ? "errorBox" : ""}
            onChange={e => setConfirm(e.target.value)}
            placeholder="Re-enter password"
          />
        </Form.Field>
        <Button type="submit">Register</Button>
      </Form>
      <div className="logoutDiv">
        <Link to="/login">Log in</Link>
      </div>
    </div>
  )
}
