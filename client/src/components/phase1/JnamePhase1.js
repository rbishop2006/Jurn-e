import React, { useEffect } from "react"
import { Button, Icon, Tab } from "semantic-ui-react"
import { Link } from "react-router-dom"
import InviteUsers from "./InviteUsers"
import PhotoPicker from "./PhotoPicker"
import DatesPicker from "./DatesPicker"
import LocationPicker from "./LocationPicker"
import HotelPicker from "./HotelPicker"
import Activities from "./Activities"
import { usePhase1, useAside, useMain } from "../../hooks"
import "../../styles/phase1/phase1.scss"

export default props => {
  const { jname, updatePhase1 } = usePhase1()
  const jurn_id = props.match.params.jurn_id
  const { aUser, delJurn, fetchAside } = useAside()
  const user_id = aUser.user_id

  const { get } = useMain()

  function handleDecline(e, jurn_id) {
    //ask about removing prevent default, or other solution
    e.preventDefault()
    delJurn(user_id, jurn_id).then(() => {
      fetchAside()
      get()
      props.history.push("/Jurne/dashboard")
    })
  }

  useEffect(() => {
    updatePhase1(props.match.params.jurn_id)
  }, [props.match.params.jurn_id])

  const panes = [
    {
      menuItem: `Photo`,
      render: () => (
        <Tab.Pane attached={false}>
          <PhotoPicker match={props.match} />
        </Tab.Pane>
      )
    },
    {
      menuItem: `Locations`,
      render: () => (
        <Tab.Pane attached={false}>
          <LocationPicker match={props.match} />
        </Tab.Pane>
      )
    },
    {
      menuItem: `Accommodations`,
      render: () => (
        <Tab.Pane attached={false}>
          <HotelPicker match={props.match} />
        </Tab.Pane>
      )
    },
    {
      menuItem: `Dates`,
      render: () => (
        <Tab.Pane attached={false}>
          <DatesPicker match={props.match} />
        </Tab.Pane>
      )
    },
    {
      menuItem: `Activities`,
      render: () => (
        <Tab.Pane attached={false}>
          <Activities match={props.match} />
        </Tab.Pane>
      )
    }
  ]

  return (
    <div className="phase1">
      <h1>{jname.jname}</h1>
      <div className="p1tableWrapper">
        <InviteUsers match={props.match} />

        <div className="selectionsMenu">
          <h4>
            Jurn
            <span>
              <em>(e)</em> Planning
            </span>
          </h4>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </div>
      </div>
      <div>
        <Button type="button" onClick={e => handleDecline(e, jurn_id)}>
          <span>
            Remove Jurn<em>(e)</em>
            <Icon name="remove" />
          </span>
        </Button>

        <Link to={"/Jurne/dashboard/final/" + jurn_id} className="commitPlans">
          <Button type="submit">
            <span>
              <Icon name="arrow right" />
              My J<em>(e)</em>
            </span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
