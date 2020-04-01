import React from "react"
import { Button, Menu } from "semantic-ui-react"
import { useAside } from "../../hooks"
import { Link } from "react-router-dom"
import "../../styles/aside.scss"

export default props => {
  const { aJurns } = useAside()

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
                <Button type="button">Edit</Button>
              </Link>
            </Menu.Item>
          </Menu>
        ))}
      </div>
    </div>
  )
}
