import React from "react"
import { Link } from "react-router-dom"
import { Button } from "semantic-ui-react"
import "../styles/frontPage.scss"

export default props => {
  return (
    <div className="frontwrapper">
      <div className="frontHeader">
        <Link to="/login" className="logIn">
          Log in
        </Link>
        <Link to="/register">
          <Button type="button" className="signUp">
            Sign up for <em>free</em>
          </Button>
        </Link>
      </div>
      <div className="frontMain">
        <h1>
          Jurn(<em>ease</em>)
        </h1>
        <h2>
          Plan vacation events together with <em>ease</em>.
        </h2>
      </div>
    </div>
  )
}
