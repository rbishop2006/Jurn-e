import React, { useState, useEffect } from "react"
import { Form, Button, Radio } from "semantic-ui-react"
import { useLocations } from "../../hooks"

export default props => {
  const { locations, getLocs, sendLocation, updateLocation } = useLocations()
  const [location, setLocation] = useState("")
  const [finalLocation, setFinalLocation] = useState("")
  // const [hotel, setHotel] = useState("")
  // const [finalHotel, setFinalHotel] = useState("")
  // const [error, setError] = useState(false)

  function handleLocSug(e) {
    e.preventDefault()
    sendLocation(location, props.match.params.jname)
    setLocation("")
  }

  // function handleHotelSug(e) {
  //   e.preventDefault()
  //   sendLocation(location, props.match.params.jname)
  //   setLocation("")
  // }

  function handleFinalPlans(e) {
    e.preventDefault()
    updateLocation(location, props.match.params.jname)
    setLocation("")
  }

  // useEffect(() => {
  //   getLocs(props.match.params.jurn_id)
  // }, [])

  return (
    <div className="phase1">
      <h1>{props.match.params.jname}</h1>
      <Form className="suggestDiv" onSubmit={handleFinalPlans}>
        <Form.Group onSubmit={handleLocSug} className="locationSect">
          <Form.Input
            fluid
            label="Make a suggestion for locations"
            placeholder="ex. Riviera Maya"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <Button attached="right" type="submit">
            Suggest
          </Button>
        </Form.Group>
        {/* {locations.map((each, i) => ( */}
        <Form.Group inline>
          <Form.Radio
            label="East Side"
            value="East Side"
            checked={finalLocation === "East Side"}
            onChange={e => setFinalLocation(e.target.value)}
          />
          {/* ))} */}
          <Form.Radio
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
          />
        </Form.Group>

        {/* <Form onSubmit={handleHotelSug} className="hotelSect">
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
        </Form> */}
        <Button type="submit">Finalize Plans</Button>
      </Form>
    </div>
  )
}
