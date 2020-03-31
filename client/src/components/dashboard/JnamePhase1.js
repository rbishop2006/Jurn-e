import React, { useState, useEffect } from "react"
import { Form, Button, Radio } from "semantic-ui-react"
import { usePhase1 } from "../../hooks"
import "../../styles/phase1.scss"

export default props => {
  const {
    jname,
    locations,
    updatePhase1,
    sendLocation,
    sendHotel,
    updateChoices,
    hotels
  } = usePhase1()
  const jurn_id = props.match.params.jurn_id
  const [location, setLocation] = useState("")
  const [finalLocation, setFinalLocation] = useState("")
  const [hotel, setHotel] = useState("")
  const [finalHotel, setFinalHotel] = useState("")

  function handleLocSug(e) {
    e.preventDefault()
    sendLocation(location, jurn_id)
    setLocation("")
    updatePhase1(jurn_id)
  }

  function handleHotSug(e) {
    e.preventDefault()
    sendHotel(hotel, jurn_id)
    setHotel("")
    updatePhase1(jurn_id)
  }

  function handleFinalPlans(e) {
    e.preventDefault()
    updateChoices(finalLocation, finalHotel, jurn_id).then(jurn_id => {
      props.history.push("/Jurne/dashboard/final/" + jurn_id)
    })
  }

  useEffect(() => {
    updatePhase1(props.match.params.jurn_id)
  }, [props.match.params.jurn_id, location])

  return (
    <div className="phase1">
      <h1>{jname.jname}</h1>
      <Form className="suggestLocDiv" onSubmit={handleLocSug}>
        <Form.Group className="locationSect">
          <Form.Input
            fluid
            label="Make a suggestion for locations"
            placeholder="ex. Riviera Maya"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </Form.Group>
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
        {/* <Form.Button>Submit</Form.Button> */}
      </Form>
      <Form className="suggestHotDiv" onSubmit={handleHotSug}>
        <Form.Group className="hotelSect">
          <Form.Input
            fluid
            label="Make a suggestion for accommodations"
            placeholder="ex. Four Seasons Maui"
            value={hotel}
            onChange={e => setHotel(e.target.value)}
          />
        </Form.Group>
        <Form.Field inline>
          {hotels.map((hotel, i) => (
            <Radio
              key={"hotel" + i}
              label={hotel.hotel}
              name="radioGroup2"
              value={hotel.hotel}
              onChange={e => setFinalHotel(hotel.hotel)}
              checked={hotel.hotel === finalHotel}
            />
          ))}
        </Form.Field>
      </Form>
      <Form onSubmit={handleFinalPlans}>
        <Button type="submit">Finalize Plans</Button>
      </Form>
    </div>
  )
}
