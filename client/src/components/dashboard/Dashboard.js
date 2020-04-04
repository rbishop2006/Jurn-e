import React, { useEffect } from "react"
import Main from "./Main"
import Header from "./Header"
import Aside from "../aside/Aside"
import JnamePhase1 from "../phase1/JnamePhase1"
import JnamePhase2 from "./JnamePhase2"
import "../../styles/dashboard.scss"
import { useMain } from "../../hooks"
import { Route } from "react-router-dom"

export default (props) => {
  const { get } = useMain()
  console.log(props)

  useEffect(() => {
    get()
  }, [props])

  return (
    <div className="grid">
      <Aside history={props.history} />
      <Header history={props.history} />
      <Route
        exact
        path="/Jurne/dashboard"
        component={Main}
        history={props.history}
      />
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
