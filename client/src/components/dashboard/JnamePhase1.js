import React, { useState, useEffect } from "react"
import { Form, Button } from "semantic-ui-react"
import { usePhase1 } from "../../hooks"

export default props => {
  const {
    jname,
    locations,
    updatePhase1,
    sendLocation,
    updateChoices
  } = usePhase1()
  const [location, setLocation] = useState("")
  const [finalLocation, setFinalLocation] = useState("")
  // const [hotel, setHotel] = useState("")
  // const [finalHotel, setFinalHotel] = useState("")
  // const [error, setError] = useState(false)

  function handleLocSug(e) {
    e.preventDefault()
    sendLocation(location, props.match.params.jurn_id)
    setLocation("")
    updatePhase1(props.match.params.jurn_id)
  }

  // function handleFinalPlans(e) {
  //   e.preventDefault()
  //   updateChoices(location, props.match.params.id)
  //   setLocation("")
  // }

  useEffect(() => {
    updatePhase1(props.match.params.jurn_id)
  }, [props.match.params.jurn_id, location])

  return (
    <div className="phase1">
      <h1>{jname.jname}</h1>
      <Form className="suggestDiv" onSubmit={handleLocSug}>
        <Form.Group className="locationSect">
          <Form.Input
            fluid
            label="Make a suggestion for locations"
            placeholder="ex. Riviera Maya"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <Form.Button>Submit</Form.Button>
        </Form.Group>
        <Form.Group inline>
          {locations.map((location, i) => (
            <Form.Radio
              key={"location" + i}
              label={location.location}
              value={location.location}
              checked={finalLocation === location.location}
              onChange={e => setFinalLocation(e.target.value)}
            />
          ))}
        </Form.Group>
        {/* onSubmit={handleFinalPlans} */}
        <Button type="submit">Finalize Plans</Button>
      </Form>
    </div>
  )
}

/* <Form.Radio
            label="Blue Forest"
            value="Blue Forest"
            checked={finalLocation === "Blue Forest"}
            onChange={e => setFinalLocation(e.target.value)}
          />
          <Form.Radio
            label="Downtown"
            value="Downtown"
            checked={finalLocation === "Downtown"}
            onChange={e => setFinalLocation(e.target.value)}
          /> */

/* <Form onSubmit={handleHotelSug} className="hotelSect">
          <Form.Input
            fluid
            label="Hotel Ideas"
            placeholder="ex. Four Seasons Maui"
            value={hotel}
            onChange={e => setHotel(e.target.value)}
          />
          <Button attached="right" type="submit">
            Submit
          </Button>
        </Form>
        <Form>
          {hotels.map((each, i) => (
          <Form.Field>
            <Radio
              label={hotel}
              name="radioGroup"
              value={finalHotel}
              onChange={e => setFinalHotel(e.target.value)}
            />
          </Form.Field>
          ))} 
        </Form> */
