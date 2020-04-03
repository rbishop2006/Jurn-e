import React, { useState, useEffect } from "react"
import { Form, Button, Radio, List, Checkbox } from "semantic-ui-react"
import SemanticDatepicker from "react-semantic-ui-datepickers"
import moment from "moment"
import { usePhase1, usePhase2 } from "../../hooks"
import "../../styles/phase1/dateSuggest.scss"

export default props => {
  const { sendDates, dateRanges, updatePhase1, updateFinalDates } = usePhase1()
  const { jurnInfo, updatePhase2 } = usePhase2()
  const [newRange, setNewRange] = useState([])
  const [finalDate, setFinalDate] = useState({})
  const jurn_id = props.match.params.jurn_id

  function handleDateSug(e) {
    e.preventDefault()
    sendDates(newRange, jurn_id)
    setNewRange([])
    updatePhase1(jurn_id)
  }

  function onChange(e, data) {
    setNewRange(data.value)
  }

  function handleFinalDate(e) {
    e.preventDefault()
    updateFinalDates(finalDate, jurn_id)
    setFinalDate({})
    updatePhase2(jurn_id)
  }

  useEffect(() => {
    updatePhase2(jurn_id)
    updatePhase1(jurn_id)
  }, [jurn_id, finalDate, newRange])

  return (
    <div className="suggestDateDiv">
      <Form onSubmit={handleDateSug}>
        <h3>Dates Section</h3>
        <Form.Group className="datesSect">
          <SemanticDatepicker
            locale="en-US"
            onChange={onChange}
            type="range"
            format="MM-DD-YYYY"
            pointing="right"
            datePickerOnly={true}
            value={newRange}
          />
          <Button type="submit">Submit Dates</Button>
          <Form.Field inline>
            {dateRanges.map((date, i) => (
              <Radio
                key={"dateRange" + i}
                label={
                  moment(date.startDate).format("MMM Do, YYYY") +
                  " - " +
                  moment(date.endDate).format("MMM Do, YYYY")
                }
                name="radioGroup3"
                value={date.startDate + "," + date.endDate}
                onChange={e =>
                  setFinalDate(date.startDate + "," + date.endDate)
                }
                checked={date.startDate + "," + date.endDate === finalDate}
              />
            ))}
          </Form.Field>
        </Form.Group>
      </Form>
      <Form onSubmit={handleFinalDate} className="commitDates">
        <Button type="submit">Commit Changes</Button>
      </Form>
      <h4 className="p2location">
        Current Selected Dates:
        {moment(jurnInfo.start_date).format("MMM Do, YYYY") + " - "}
        {moment(jurnInfo.end_date).format("MMM Do, YYYY")}
      </h4>
    </div>
  )
}