import React, { useEffect } from "react"
import UserProfile from "./UserProfile"
import AsideJurnes from "./AsideJurnes"
import Message from "./Message"
import MessageForm from "./MessageForm"
import { useAside, useMessages } from "../../hooks"
import "../../styles/aside/aside.scss"

export default (props) => {
  const { fetchAside } = useAside()
  const { getMessages } = useMessages()

  useEffect(() => {
    fetchAside()
    getMessages()
  }, [])

  return (
    <aside>
      <UserProfile />
      <AsideJurnes />
      <h5>
        Jurn(<em>e</em>) Messages
      </h5>
      <MessageForm />
      <Message />
    </aside>
  )
}
