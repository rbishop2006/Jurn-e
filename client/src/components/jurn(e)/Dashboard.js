import React, { useEffect } from "react"
// import { Button } from "semantic-ui-react"
// import { useAuth } from "react-auth"
import Main from "./Main"
import Aside from "./Aside"
import "../../styles/dashboard.scss"
import { useDashboard } from "../../hooks"
import { useAuth } from "react-auth"

export default props => {
  const { get, dashboard } = useDashboard()

  useEffect(() => {
    get()
  }, [])

  return (
    <div className="grid">
      <Aside />
      <Main />
    </div>
  )
}
