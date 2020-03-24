import React, { useEffect } from "react"
import Main from "./Main"
import Aside from "./Aside"
import "../../styles/dashboard.scss"
import { useDashboard } from "../../hooks"

export default props => {
  const { get } = useDashboard()

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
