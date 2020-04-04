import React, { useState } from "react"
import { Form, Button, Dropdown } from "semantic-ui-react"
// import { usePhase1, usePhase2 } from "../../hooks"
import "../../styles/phase1/photos.scss"

export default (props) => {
  const [photo, setPhoto] = useState("")

  const pictures = [
    {
      icon: "user",
      text: "Person",
      value: "user",
      as: Dropdown.Item,
    },
    {
      icon: "user secret",
      text: "Super Secret",
      value: "user secret",
      as: Dropdown.Item,
    },
    {
      icon: "plane",
      text: "Air Traveler",
      value: "plane",
      as: Dropdown.Item,
    },
    {
      icon: "ship",
      text: "Cruise Passenger",
      value: "ship",
      as: Dropdown.Item,
    },
    {
      icon: "train",
      text: "Train Enthusiast",
      value: "train",
      as: Dropdown.Item,
    },
    {
      icon: "car",
      text: "Driver",
      value: "car",
      as: Dropdown.Item,
    },
    {
      icon: "bicycle",
      text: "Bicyclist",
      value: "bicycle",
      as: Dropdown.Item,
    },
    {
      icon: "motorcycle",
      text: "Motorcyclist",
      value: "motorcycle",
      as: Dropdown.Item,
    },
  ]

  return (
    <div>
      <Form>
        <Dropdown
          placeholder="Select a Photo"
          icon="arrow up"
          labeled
          options={pictures}
          button
          value={photo}
          onChange={(e, { value }) => setPhoto(value)}
          className="photo"
        />
        <Button type="submit" className="updateProfile">
          Update Jurn(<em>e</em>) Photo
        </Button>
      </Form>
    </div>
  )
}
