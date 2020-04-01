import React, { useState } from "react"
import { useAuth } from "react-auth"
import { Icon, Button, Form } from "semantic-ui-react"
import { useAside } from "../../hooks"
import "../../styles/aside.scss"

export default props => {
  const { signout } = useAuth()
  const { aUser } = useAside()
  const user_id = aUser.user_id
  const [show, setShow] = useState(true)
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [cellphone, setCellphone] = useState("")

  // function updateProfile(e) {
  //   e.preventDefault()
  //   sendProfile(fname, lname, cellphone, user_id)
  //   updateAside(user_id)
  // }

  return (
    <div className={show ? "userProfile" : "expand"}>
      <div className="profileDiv">
        <div>
          <Icon name="user secret" color="grey" size="big" />
          <p className="user">
            {aUser.fname} {aUser.lname}
          </p>
          <p className="status"></p>
        </div>
        <Button className="logOut" onClick={e => signout()}>
          Log out
        </Button>
      </div>
      <Button
        className="editProfile"
        onClick={e => (!show ? setShow(true) : setShow(false))}
      >
        <Icon name="edit" />
      </Button>

      <Form className="profileForm">
        {/* onClick={e => updateProfile()} */}
        <Form.Input
          fluid
          label="First name"
          placeholder={aUser.fname}
          value={fname}
          onChange={e => setFname(e.target.value)}
        />
        <Form.Input
          fluid
          label="Last name"
          placeholder={aUser.lname}
          value={lname}
          onChange={e => setLname(e.target.value)}
        />
        <Form.Input
          fluid
          label="Cell Phone"
          placeholder={aUser.cell_phone}
          value={cellphone}
          onChange={e => setCellphone(e.target.value)}
        />
        <Button type="submit" className="updateProfile">
          Update Profile
        </Button>
      </Form>
    </div>
  )
}
