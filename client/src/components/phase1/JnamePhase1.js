import React, { useEffect } from "react"
import { Button } from "semantic-ui-react"
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

  return (
    <div className="phase1">
      <Button type="button" onClick={e => handleDecline(e, jurn_id)}>
        Remove Jurn<em>(e)</em>
      </Button>

      <h1>{jname.jname}</h1>
      <PhotoPicker match={props.match} />
      <InviteUsers match={props.match} />
      <DatesPicker match={props.match} />
      <LocationPicker match={props.match} />
      <HotelPicker match={props.match} />
      <Activities match={props.match} />
      <Link to={"/Jurne/dashboard/final/" + jurn_id} className="commitPlans">
        <Button type="submit">Go to Phase 2</Button>
      </Link>
    </div>
  )
}
