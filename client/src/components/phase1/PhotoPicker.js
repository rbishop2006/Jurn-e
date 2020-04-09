import React, { useState } from "react"
import { Form, Button, Dropdown, Icon } from "semantic-ui-react"
import { usePhase1 } from "../../hooks"
import validator from "validator"
import "../../styles/phase1/photos.scss"

export default (props) => {
  const jurn_id = props.match.params.jurn_id
  const [photo, setPhoto] = useState("")
  const { updatePhase1, updatePhoto } = usePhase1()

  const pictures = [
    {
      image: { src: `/JurnEase-picture2.jpeg` },
      text: "Jurn(ease)",
      value: "/JurnEase-picture2.jpeg",
      as: Dropdown.Item,
    },
    {
      image: { src: `/beach.jpg` },
      text: "Beach vacation",
      value: "/beach.jpg",
      as: Dropdown.Item,
    },
    {
      image: { src: `/drinks.jpg` },
      text: "Night on the Town",
      value: "/drinks.jpg",
      as: Dropdown.Item,
    },
    {
      image: { src: `/downtown.jpg` },
      text: "Big City Adventure",
      value: "/downtown.jpg",
      as: Dropdown.Item,
    },
    {
      image: { src: `/lasVegas.jpg` },
      text: "Vegas Baby!",
      value: "/lasVegas.jpg",
      as: Dropdown.Item,
    },
    {
      image: { src: `/golfCourse.jpg` },
      text: "Golf Getaway",
      value: "/golfCourse.jpg",
      as: Dropdown.Item,
    },
    {
      image: { src: `/nature.jpg` },
      text: "Back to Nature",
      value: "/nature.jpg",
      as: Dropdown.Item,
    },
    {
      image: { src: `/lakeHouse.jpg` },
      text: "Lake Retreat",
      value: "/lakeHouse.jpg",
      as: Dropdown.Item,
    },
    {
      image: { src: `/cruiseShip.jpg` },
      text: "Lets Cruise",
      value: "/cruiseShip.jpg",
      as: Dropdown.Item,
    },
  ]

  function sendPhoto(e) {
    e.preventDefault()
    let valid = true

    if (validator.isEmpty(photo)) {
      valid = false
    }
    if (valid) {
      updatePhoto(jurn_id, photo)
    }
    updatePhase1(jurn_id)
  }

  return (
    <div className="photoDiv">
      <Form onSubmit={sendPhoto} className="photoForm">
        <h3>Photo</h3>
        <div className="photoSel">
          <Dropdown
            id="dropdown"
            placeholder="Select a Photo"
            labeled
            options={pictures}
            button
            value={photo}
            onChange={(e, { value }) => setPhoto(value)}
          />

          <Button type="submit" className="updateProfile">
            <span>
              Update Jurn(<em>e</em>) Photo {""} <Icon name="camera" />
            </span>
          </Button>
        </div>
      </Form>
    </div>
  )
}
