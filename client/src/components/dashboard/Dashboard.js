import React, { useEffect } from "react"
import Main from "./Main"
import Header from "./Header"
import Aside from "./Aside"
import JnamePhase1 from "./JnamePhase1"
import JnamePhase2 from "./JnamePhase2"
import "../../styles/dashboard.scss"
import { useDashboard } from "../../hooks"
import { Route } from "react-router-dom"

export default props => {
  const { get, jurns } = useDashboard()

  useEffect(() => {
    get()
  }, [jurns])

  /* //working on JnamePhase2 component */
  return (
    <div className="grid">
      <Aside />
      <Header history={props.history} />
      <Route exact path="/Jurne/dashboard" component={Main} />
      <Route
        exact
        path="/Jurne/dashboard/:jurn_id"
        component={JnamePhase1}
        history={props.history}
      />
      <Route
        path="/Jurne/dashboard/final/:jurn_id"
        component={JnamePhase2}
        history={props.history}
      />
    </div>
  )
}
