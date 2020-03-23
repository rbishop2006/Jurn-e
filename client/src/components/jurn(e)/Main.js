import React from "react"
import Header from "./Header"
import { Segment } from "semantic-ui-react"

export default props => {
  return (
    <main>
      <Header />
      <div className="dashMain">
        <Segment vertical></Segment>
        <Segment vertical>
          <img src="https://place-hold.it/800x200" alt="placeholder" />
        </Segment>
        <Segment vertical>
          <img src="https://place-hold.it/800x200" alt="placeholder" />
        </Segment>
        <Segment vertical>
          <img src="https://place-hold.it/800x200" alt="placeholder" />
        </Segment>
        <Segment vertical>
          <img src="https://place-hold.it/800x200" alt="placeholder" />
        </Segment>
      </div>
    </main>
  )
}
