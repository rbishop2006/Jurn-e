import React, { useState, useEffect } from "react"
import { Form, Button, Radio, List, Checkbox } from "semantic-ui-react"
import { usePhase1, useActs } from "../../hooks"
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

  const {
    acts,
    actsCount,
    addAct,
    toggleAct,
    filterActs,
    clearActs,
    updateActs
  } = useActs()

  const jurn_id = props.match.params.jurn_id
  const [location, setLocation] = useState("")
  const [finalLocation, setFinalLocation] = useState("")
  const [hotel, setHotel] = useState("")
  const [finalHotel, setFinalHotel] = useState("")
  const [activity, setActivity] = useState("")
  const [view, setView] = useState("all")

  function handleActivity(e) {
    e.preventDefault()
    addAct(activity, jurn_id)
    setActivity("")
  }

  function changeView(status) {
    setView(status)
    filterActs(status, jurn_id)
  }

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
    updateActs(props.match.params.jurn_id)
  }, [props.match.params.jurn_id, location, hotel, activity])

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

      <Form onSubmit={handleActivity} className="p1Activities">
        <Form.Input
          fluid
          label="add Activities here..."
          placeholder='ex. "drinks on the patio after dinner"'
          value={activity}
          onChange={e => setActivity(e.target.value)}
        />
        <Form.Button>Submit</Form.Button>
      </Form>
      <h5>Activities</h5>

      {acts.map((act, i) => (
        <Checkbox
          key={"activity" + i}
          value={act.act}
          label={
            act.status === "completed" ? (
              <span className="completed">
                <Checkbox
                  value={act.act}
                  label={act.act}
                  checked={act.status === "completed"}
                  onChange={e => toggleAct(act.act_id, jurn_id)}
                />
              </span>
            ) : (
              act.act
            )
          }
          checked={act.status === "completed"}
          onChange={e => toggleAct(act.act_id, jurn_id)}
        />
      ))}

      <Form>
        <Form.Field className="p1ActFilters">
          <Radio
            label="All"
            name="filterActs"
            checked={view === "all" ? true : false}
            onChange={e => changeView("all")}
          />
          <Radio
            label="Active"
            name="filterActs"
            checked={view === "active" ? true : false}
            onChange={e => changeView("active")}
          />
          <Radio
            label="Completed"
            name="filterActs"
            checked={view === "completed" ? true : false}
            onChange={e => changeView("completed")}
          />
        </Form.Field>

        <h5> Activities left: {actsCount}</h5>
      </Form>
      <Form onSubmit={e => clearActs(jurn_id)}>
        <Button type="submit">Clear Completed</Button>
      </Form>
    </div>
  )
}
