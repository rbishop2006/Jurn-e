import React from "react"
import { Button } from "semantic-ui-react"
import { useAuth } from "react-auth"
// import RoomMain from "./RoomMain"
// import RoomAside from "./RoomAside"
// import "../../styles/chatroom.scss"

export default props => {
  const { signout } = useAuth()

  return (
    <div className="grid">
      <h1>hello world</h1>
      <Button onClick={e => signout()}>Log out</Button>
      {/* <RoomAside />
      <RoomMain room={props.match.params.page} /> */}
    </div>
  )
}
