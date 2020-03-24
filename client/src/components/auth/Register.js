import React, { useState } from "react"
import { api, useAuth } from "react-auth"
import { Link } from "react-router-dom"
// import validator from "validator"
import { Button, Form } from "semantic-ui-react"
import "../../styles/Login.scss"

export default props => {
  const { signin } = useAuth()
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [fname, setFname] = useState("")
  const [fnameError, setFnameError] = useState("")
  const [lname, setLname] = useState("")
  const [lnameError, setLnameError] = useState("")
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
        props.history.push("/Jurne/dashboard")
      })
    })
  }
  // }

  return (
    <div className="registerDiv">
      <h1>Register</h1>
      <Form onSubmit={handleRegister}>
        <Form.Field>
          {/* <Form.Input fluid label="First name" placeholder="First name" error /> */}
          <label className={emailError ? "error" : ""} htmlFor="email">
            Email {emailError && emailError}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            className={emailError ? "errorBox" : ""}
            onChange={e => setEmail(e.target.value)}
            placeholder="johnsmith@email.com"
          />
        </Form.Field>
        <Form.Field>
          <label className={fnameError ? "error" : ""} htmlFor="fname">
            First Name {fnameError && fnameError}
          </label>
          <input
            id="fname"
            type="text"
            value={fname}
            className={fnameError ? "errorBox" : ""}
            onChange={e => setFname(e.target.value)}
            placeholder="ex. John"
          />
        </Form.Field>
        <Form.Field>
          <label className={lnameError ? "error" : ""} htmlFor="lname">
            Last Name {lnameError && lnameError}
          </label>
          <input
            id="lname"
            type="text"
            value={lname}
            className={lnameError ? "errorBox" : ""}
            onChange={e => setLname(e.target.value)}
            placeholder="ex. Smith"
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
        <div className="linkDiv">
          <p>Already a Jurn(ease) member?</p>
          <Link to="/login">Click Here</Link>
        </div>
      </Form>
    </div>
  )
}
