import React from "react"
import RoomMain from "./RoomMain"
import RoomAside from "./RoomAside"
// import "../../styles/chatroom.scss"

export default props => {
  return (
    <div className="grid">
      <RoomAside />
      <RoomMain room={props.match.params.page} />
    </div>
  )
}
