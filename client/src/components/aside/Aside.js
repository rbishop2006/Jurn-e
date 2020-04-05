import React, { useEffect } from "react"
import UserProfile from "./UserProfile"
import AsideJurnes from "./AsideJurnes"
import { Icon, Feed } from "semantic-ui-react"
import { useAside } from "../../hooks"
import "../../styles/aside.scss"

export default (props) => {
  const { fetchAside } = useAside()

  useEffect(() => {
    fetchAside()
  }, [])

  return (
    <aside>
      <UserProfile />
      <AsideJurnes />
      <h5>Message Area</h5>
      <Feed>
        <Feed.Event>
          <Feed.Label>
            <img src="https://place-hold.it/25" alt="placeholder" />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>Elliot Fu</Feed.User> added you as a friend
              <Feed.Date>1 Hour Ago</Feed.Date>
            </Feed.Summary>
            <Feed.Meta>
              <Feed.Like>
                <Icon name="like" />4 Likes
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </aside>
  )
}
