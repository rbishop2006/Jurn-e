import React, { useState } from "react"
import { useAuth } from "react-auth"
import { Link } from "react-router-dom"
import { Button, Form } from "semantic-ui-react"
import "../../styles/Login.scss"

export default props => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const { signin } = useAuth()

  function handleLogin(e) {
    e.preventDefault()
    signin(username, password)
      .then(profile => {
        props.history.push("/Jurne/dashboard")
      })
      .catch(e => {
        setError(true)
        setPassword("")
        setUsername("")
      })
  }

  return (
    <div>
      <Link to={"/Jurne"} className="logo">
        <img src="/assets/JurnEase-logo.png" alt="Jurn(ease) logo"></img>
      </Link>
      <Form onSubmit={handleLogin} className="loginDiv">
        <Form.Input
          error={
            error
              ? { content: "Invalid username or password", pointing: "below" }
              : false
          }
          fluid
          label="Email"
          placeholder="ex. JohnSmith@email.com"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <Form.Input
          error={error}
          fluid
          label="Password"
          placeholder="password"
          value={password}
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <Button type="submit">Log in</Button>
        <div className="linkDiv">
          <p>New user?</p>
          <Link to="/register">Register Here</Link>
        </div>
      </Form>
    </div>
  )
}
