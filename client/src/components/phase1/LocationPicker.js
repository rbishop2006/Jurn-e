import React, { useState, useEffect } from "react"
import { Form, Button, Radio } from "semantic-ui-react"
import { usePhase1, usePhase2 } from "../../hooks"
import "../../styles/phase1/locations.scss"

export default props => {
  const {
    locations,
    updatePhase1,
    sendLocation,
    updateFinalLocation
  } = usePhase1()
  const { jurnInfo, updatePhase2 } = usePhase2()
  const jurn_id = props.match.params.jurn_id
  const [location, setLocation] = useState("")
  const [finalLocation, setFinalLocation] = useState("")

  function handleLocSug(e) {
    e.preventDefault()
    sendLocation(location, jurn_id)
    setLocation("")
    updatePhase1(jurn_id)
  }

  function handleFinalLocation(e) {
    e.preventDefault()
    updateFinalLocation(finalLocation, jurn_id)
    setFinalLocation("")
    updatePhase2(jurn_id)
  }

  useEffect(() => {
    updatePhase2(jurn_id)
    updatePhase1(jurn_id)
  }, [jurn_id, location, finalLocation])

  return (
    <div className="suggestLocDiv">
      <Form onSubmit={handleLocSug}>
        <h3>Locations Section</h3>
        <Form.Group className="locationSect">
          <Form.Input
            fluid
            label="Make a suggestion for locations"
            placeholder="ex. Riviera Maya"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <Form.Field inline>
            {locations.map((location, i) => (
              <Radio
                key={"location" + i}
                label={location.location}
                name="radioGroup"
                value={location.location}
                onChange={e => setFinalLocation(location.location)}
                checked={location.location === finalLocation}
              />
            ))}
          </Form.Field>
        </Form.Group>
      </Form>
      <Form onSubmit={handleFinalLocation} className="commitLocation">
        <Button type="submit">Commit Changes</Button>
      </Form>
      <h4 className="p2location">
        Current Location:
        {jurnInfo.location}
      </h4>
    </div>
  )
}
