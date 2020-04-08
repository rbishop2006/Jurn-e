import React, { useEffect } from "react"
import UserProfile from "./UserProfile"
import AsideJurnes from "./AsideJurnes"
import Message from "./Message"
import MessageForm from "./MessageForm"
import { useAside } from "../../hooks"
import "../../styles/aside/aside.scss"

export default (props) => {
  const { fetchAside } = useAside()

  useEffect(() => {
    fetchAside()
  }, [])

  return (
    <aside>
      <UserProfile />
      <AsideJurnes />
      <h5>Messages</h5>
      <MessageForm />
      <Message />
    </aside>
  )
}
