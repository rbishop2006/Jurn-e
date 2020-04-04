import React, { useState } from "react"
import { Button, Menu, Icon } from "semantic-ui-react"
import { useAside } from "../../hooks"
import { Link } from "react-router-dom"
import "../../styles/aside.scss"

export default props => {
  const [jurnId, setJurnId] = useState("")
  const {
    aUser,
    aJurns,
    pendingJurns,
    fetchAside,
    sendAccept,
    sendDecline
  } = useAside()
  const user_id = aUser.user_id

  function handleAccept(e, jurn_id) {
    e.preventDefault()
    setJurnId(jurn_id)
    sendAccept(user_id, jurn_id)
    fetchAside()
  }

  function handleDecline(e, jurn_id) {
    e.preventDefault()
    setJurnId(jurn_id)
    sendDecline(user_id, jurn_id)
    fetchAside()
  }

  return (
    <div className="jurnesDiv">
      <h5>
        Jurn<em>(e)</em>s
      </h5>
      <div className="jurnList">
        {aJurns.map((jurn, i) => (
          <Menu key={"jurn" + i} vertical id="menu">
            <Menu.Item name={jurn.name} active={true} id="menuItem">
              <p>{jurn.name}</p>
              <Link to={"/Jurne/dashboard/" + jurn.id}>
                <Button type="button">
                  <Icon name="pencil" />
                </Button>
              </Link>
            </Menu.Item>
          </Menu>
        ))}
      </div>
      <h5>
        Jurn<em>(e)</em> invitations
      </h5>
      <div className="pendList">
        {pendingJurns.map((pendJurn, i) => (
          <Menu key={"pendJurn" + i} vertical id="menu2">
            <Menu.Item name={pendJurn.name} active={true} id="menuItem2">
              <p>{pendJurn.name}</p>
              <div>
                <Button
                  value={pendJurn.id}
                  type="button"
                  onClick={e => handleAccept(e, pendJurn.id)}
                >
                  Accept
                </Button>
                <Button
                  type="button"
                  onClick={e => handleDecline(e, pendJurn.id)}
                >
                  Decline
                </Button>
              </div>
            </Menu.Item>
          </Menu>
        ))}
      </div>
    </div>
  )
}
