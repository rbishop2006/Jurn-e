import React from "react"
// import { Button } from "semantic-ui-react"
import Main from "./Main"
import Aside from "./Aside"
import "../../styles/dashboard.scss"
import { useDashboard } from "../../hooks"

export default props => {
  const { get } = useDashboard()

  return (
    <div className="grid">
      <Aside />
      <Main />
    </div>
  )
}
