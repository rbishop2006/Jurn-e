import React, { useState, useEffect } from "react"
import { Form, Button, Radio } from "semantic-ui-react"
import { useLocations } from "../../hooks"

export default props => {
  const [location, setLocation] = useState("")
  // const [error, setError] = useState(false)
  const [selection, setSelection] = useState("")
  const { locations, getLocs, sendLocation } = useLocations()

  function handleSubmit(e) {
    e.preventDefault()
    sendLocation(location, props.match.params.jname)
    setLocation("")
  }

  // useEffect(() => {
  //   getLocs(props.match.params.jname)
  // }, [])

  return (
    <div className="phase1">
      <h1>{props.match.params.jname}</h1>
      <div className="suggestDiv">
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
          <Button type="submit">Submit</Button>
        </Form>
        <Form>
          {locations.map((each, i) => (
            <Form.Field>
              <Radio
                label={each.location}
                name="radioGroup"
                value={selection}
                onChange={e => setSelection(e.target.value)}
              />
            </Form.Field>
          ))}
        </Form>
      </div>
    </div>
  )
}
