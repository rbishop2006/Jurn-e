import React from "react"
import { Link } from "react-router-dom"

export default props => {
  return (
    <div>
      <h1>Hello World</h1>
      <div className="logoutDiv">
        <Link to="/login">Log in</Link>
      </div>
      <div className="linkDiv">
        <p>New user?</p>
        <Link to="/register">Register Here</Link>
      </div>
    </div>
  )
}
