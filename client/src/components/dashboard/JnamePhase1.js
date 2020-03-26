import React, { useState, useEffect } from "react"
import { Form, Button, Radio } from "semantic-ui-react"
import { useLocations } from "../../hooks"

export default props => {
  const { locations, getLocs, sendLocation, updateLocation } = useLocations()
  const [location, setLocation] = useState("")
  const [finalLocation, setFinalLocation] = useState("")
  const [hotel, setHotel] = useState("")
  const [finalHotel, setFinalHotel] = useState("")
  // const [error, setError] = useState(false)

  const jname = props.match.params.jname

  function handleSubmit(e) {
    e.preventDefault()
    sendLocation(location, jname)
    setLocation("")
  }

  function handleFinal(e) {
    e.preventDefault()
    updateLocation(location, props.match.params.jname)
    setLocation("")
  }

  // useEffect(() => {
  //   getLocs(props.match.params.jname)
  // }, [])

  return (
    <div className="phase1">
      <h1>{props.match.params.jname}</h1>
      <div className="locationDiv">
        <Form onSubmit={handleSubmit}>
          <Form.Input
            // error={
            //   error ? { content: "Can't be blank", pointing: "below" } : false
            // }
            fluid
            label="Location Ideas"
            placeholder="ex. Riviera Maya"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <Button type="submit">Suggest</Button>
        </Form>
        <Form onSubmit={handleFinal}>
          {/* {locations.map((each, i) => ( */}
          <Form.Field>
            <Radio
              label="Red River"
              name="radioGroup"
              value="Red River"
              onChange={e => setFinalLocation(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Blue forest"
              name="radioGroup"
              value="Blue forest"
              onChange={e => setFinalLocation(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Downtown"
              name="radioGroup"
              value="Downtown"
              onChange={e => setFinalLocation(e.target.value)}
            />
          </Form.Field>
          {/* ))} */}
          <Button type="submit">Final Choice</Button>
        </Form>
      </div>
      <div className="hotelDiv">
        <Form onSubmit={handleSubmit}>
          <Form.Input
            // error={
            //   error ? { content: "Can't be blank", pointing: "below" } : false
            // }
            fluid
            label="Hotel Ideas"
            placeholder="ex. Four Seasons Maui"
            value={hotel}
            onChange={e => setHotel(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </Form>
        <Form>
          {/* {hotels.map((each, i) => ( */}
          <Form.Field>
            <Radio
              label={hotel}
              name="radioGroup"
              value={finalHotel}
              onChange={e => setFinalHotel(e.target.value)}
            />
          </Form.Field>
          {/* ))} */}
        </Form>
      </div>
    </div>
  )
}
