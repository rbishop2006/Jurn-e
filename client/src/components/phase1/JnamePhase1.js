import React, { useEffect } from "react"
import { Button } from "semantic-ui-react"
import { Link } from "react-router-dom"
import InviteUsers from "./InviteUsers"
import DatesPicker from "./DatesPicker"
import LocationPicker from "./LocationPicker"
import HotelPicker from "./HotelPicker"
import Activities from "./Activities"
import { usePhase1 } from "../../hooks"
import "../../styles/phase1/phase1.scss"

export default props => {
  const { jname, updatePhase1, updateChoices } = usePhase1()
  const jurn_id = props.match.params.jurn_id

  // function handleFinalPlans(e) {
  //   e.preventDefault()
  //   updateChoices(jurn_id).then(jurn_id => {
  //     props.history.push("/Jurne/dashboard/final/" + jurn_id)
  //   })
  // }

  useEffect(() => {
    updatePhase1(props.match.params.jurn_id)
  }, [props.match.params.jurn_id])

  return (
    <div className="phase1">
      <h1>{jname.jname}</h1>
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
