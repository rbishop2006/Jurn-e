import React, { useEffect, useState } from "react"
import { Button, Menu, Icon } from "semantic-ui-react"
import { useAside, useMain } from "../../hooks"
import { Link } from "react-router-dom"
import "../../styles/aside/asideJurns.scss"

export default (props) => {
  const {
    aUser,
    aJurns,
    pendingJurns,
    fetchAside,
    sendAccept,
    sendDecline,
  } = useAside()
  const user_id = aUser.user_id
  const pendCount = pendingJurns.length
  const [hidden2, setHidden2] = useState(true)
  const { get } = useMain()

  function handleAccept(e, jurn_id) {
    e.preventDefault()
    sendAccept(user_id, jurn_id)
    fetchAside()
    get()
  }

  function handleDecline(e, jurn_id) {
    e.preventDefault()
    sendDecline(user_id, jurn_id)
    fetchAside()
    get()
  }

  useEffect(() => {
    get()
  }, [aJurns])

  return (
    <div className="jurnesDiv">
      <h5>
        My Jurn(<em>e</em>)s
      </h5>
      <div className="jurnList">
        {aJurns.map((jurn, i) => (
          <Link key={"jurn" + i} to={"/Jurne/dashboard/final/" + jurn.id}>
            <Menu id="menu">
              <Menu.Item name={jurn.name} active={true} id="menuItem">
                <p>{jurn.name}</p>
                <span>
                  My J<em>(e)</em>
                  <Icon name="arrow right" />
                </span>
              </Menu.Item>
            </Menu>
          </Link>
        ))}
      </div>
      <Button
        className="viewPending"
        onClick={(e) => (!hidden2 ? setHidden2(true) : setHidden2(false))}
      >
        Jurn(<em>e</em>) invitations (<span>{pendCount}</span>)
      </Button>
      <div className={hidden2 ? "expand2" : "pendList"}>
        {pendingJurns.map((pendJurn, i) => (
          <Menu key={"pendJurn" + i} vertical id="menu2">
            <Menu.Item name={pendJurn.name} active={true} id="menuItem2">
              <p>{pendJurn.name}</p>
              <div>
                <Button
                  value={pendJurn.id}
                  type="button"
                  onClick={(e) => handleAccept(e, pendJurn.id)}
                >
                  Accept
                </Button>
                <Button
                  type="button"
                  onClick={(e) => handleDecline(e, pendJurn.id)}
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
