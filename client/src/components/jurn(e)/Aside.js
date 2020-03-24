import React from "react"
import { useAuth } from "react-auth"
import { Icon, Button, Divider, Menu, Feed, List } from "semantic-ui-react"
import { useDashboard } from "../../hooks"

export default props => {
  const { signout } = useAuth()
  const { user, jurns, reminders } = useDashboard()

  console.log(jurns)
  console.log()

  return (
    <aside>
      <div className="userProfile">
        <div className="profileDiv">
          <Icon name="user secret" color="grey" size="big" />
          <p className="user">
            {user.fname} {user.lname}
          </p>
          <p className="status"></p>
        </div>
        <Button onClick={e => signout()}>Log out</Button>
      </div>
      <Divider />
      <h5>Jurn(e)s</h5>
      {jurns.map((each, i) => (
        <Menu key={"jurn" + i} vertical className="menu">
          <Menu.Item name={each.jname} active={true} />
        </Menu>
      ))}
      <Divider />
      <h5>Users</h5>
      <List>
        <List.Item>
          <List.Icon name="users" />
          <List.Content>User 1</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="marker" />
          <List.Content>New York, NY</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="users" />
          <List.Content>User 2</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="marker" />
          <List.Content>New York, NY</List.Content>
        </List.Item>
      </List>
      <Divider />
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
