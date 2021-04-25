import React from "react"
import { Link } from "react-router-dom"
import { Button, Segment, Grid } from "semantic-ui-react"
import "../styles/FrontPage.scss"
import variables from "../styles/_variables.scss"
import { useWindowWidth } from "../hooks/use-window-width"

export default function FrontPage(props) {
	const { width } = useWindowWidth()

	return (
		<div id="frontWrapper">
			<Segment basic className={"flex jc-end ai-center"}>
				<Button
					as={Link}
					to={"/login"}
					basic
					color={"blue"}
					className={"fw-700"}
					content={"log in"}
				/>
				<Button as={Link} to={"/register"} color={"blue"} className={"fw-700"}>
					sign up for <em>free</em>
				</Button>
			</Segment>
			<Grid columns={3} className={"frontMain"} stackable padded="horizontally">
				<Grid.Row className={"flex jc-end"}>
					<Grid.Column
						textAlign={
							width > Number(variables.smallScreen) ? "right" : "center"
						}
						verticalAlign={
							width > Number(variables.smallScreen) ? "middle" : "bottom"
						}
					>
						<h1>Traveling with family or friends?</h1>
						<p>
							The first step in any journey is planning. Jurn(<em>ease</em>)
							makes that a collaborative process by allowing you to build your
							trip together through sharing location ideas, places to stay,
							activity suggestions, discussions, an itinerary, photos, and
							expenses.
						</p>
						<h3>
							Keep and Cherish Your Travel Experiences with Jurn(<em>ease</em>).
						</h3>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</div>
	)
}
