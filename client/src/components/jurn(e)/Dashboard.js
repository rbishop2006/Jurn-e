import React from "react"
// import { Button } from "semantic-ui-react"
import { useAuth } from "react-auth"
// import RoomMain from "./RoomMain"
import Aside from "./Aside"
import "../../styles/dashboard.scss"

export default props => {
  return (
    <div className="grid">
      <Aside />
      {/* <RoomMain room={props.match.params.page} /> */}
    </div>
  )
}
