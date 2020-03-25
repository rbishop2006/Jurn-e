import React, { useEffect } from "react"
import Main from "./Main"
import Header from "./Header"
import Aside from "./Aside"
import JnamePhase1 from "./JnamePhase1"
import "../../styles/dashboard.scss"
import { useDashboard } from "../../hooks"
import { Route } from "react-router-dom"

export default props => {
  const { get } = useDashboard()

  useEffect(() => {
    get()
  }, [])

  return (
    <div className="grid">
      <Aside />
      <Header />
      <Route exact path="/Jurne/dashboard" component={Main} />
      <Route path="/Jurne/dashboard/:jname" component={JnamePhase1} />
    </div>
  )
}
