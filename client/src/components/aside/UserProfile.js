import React, { useState } from "react"
import { useAuth } from "react-auth"
import { Icon, Button, Form, Dropdown } from "semantic-ui-react"
import { useAside } from "../../hooks"
import "../../styles/aside/userProfiles.scss"

export default (props) => {
  const { signout } = useAuth()
  const { aUser, sendProfile } = useAside()
  const user_id = aUser.user_id
  const [hidden, setHidden] = useState(true)
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [cellphone, setCellphone] = useState("")
  const [avatar, setAvatar] = useState("")

  const items = [
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

  function updateProfile(e) {
    e.preventDefault()
    sendProfile(fname, lname, cellphone, avatar, user_id)
    setHidden(true)
  }

  return (
    <div className={hidden ? "userProfile" : "expand"}>
      <div className="profileDiv">
        <div>
          <Icon name={aUser.avatar} size="big" />
          <p className="user">
            {aUser.fname} {aUser.lname}
          </p>
          <p className="status"></p>
        </div>
        <Button className="logOut" onClick={(e) => signout()}>
          Log out
        </Button>
      </div>
      <Button
        className="editProfile"
        onClick={(e) => (!hidden ? setHidden(true) : setHidden(false))}
      >
        Edit
        {/* <Icon name="pencil" /> */}
      </Button>

      <Form className="profileForm" onSubmit={updateProfile}>
        <Form.Input
          fluid
          label="First name"
          placeholder={aUser.fname}
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <Form.Input
          fluid
          label="Last name"
          placeholder={aUser.lname}
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
        <Form.Input
          fluid
          label="Cell Phone"
          placeholder={aUser.cell_phone}
          value={cellphone}
          onChange={(e) => setCellphone(e.target.value)}
        />
        <Dropdown
          placeholder="Select an Avatar"
          icon="arrow up"
          upward
          labeled
          options={items}
          button
          value={avatar}
          onChange={(e, { value }) => setAvatar(value)}
          className="icon"
        />
        <Button type="submit" className="updateProfile">
          Update Profile
        </Button>
      </Form>
    </div>
  )
}
