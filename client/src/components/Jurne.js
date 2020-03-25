import React from "react"
import { Link } from "react-router-dom"

export default props => {
  return (
    <div>
      <h1>Jurn(e)</h1>
      <h2>
        A place to help ease the stress of planning your next Journey aka
        Jurn(e)
      </h2>
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
