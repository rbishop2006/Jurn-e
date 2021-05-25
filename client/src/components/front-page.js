import React from "react"
import { Link } from "react-router-dom"
import { Button, Segment, Grid, Header } from "semantic-ui-react"
import "../styles/FrontPage.scss"
import variables from "../styles/_variables.scss"
import { useWindowWidth } from "../hooks/use-window-width"

export default function FrontPage() {
	const { width } = useWindowWidth()

	return (
		<div id="frontWrapper">
			<Segment basic className={"flex jc-end ai-center m-0"}>
				<Button
					as={Link}
					to={"/Login"}
					basic
					compact
					color={"blue"}
					className={"fw-700"}
					content={"log in"}
					size={"massive"}
				/>
				<Button
					as={Link}
					to={"/Register"}
					color={"blue"}
					size={"massive"}
					compact
				>
					sign up for <em>free</em>
				</Button>
			</Segment>
			<Grid
				columns={3}
				className={"frontMain"}
				stackable
				padded={"horizontally"}
			>
				<Grid.Row>
					<Grid.Column
						floated={"right"}
						verticalAlign={
							width > Number(variables.smallScreen) ? "middle" : "bottom"
						}
					>
						<Header className={"c-front"} size={"huge"}>
							<Header.Content>Traveling with family or friends?</Header.Content>
							<Header.Subheader className={"c-front"}>
								The first step in any journey is planning. Jurn(<em>ease</em>)
								makes that a collaborative process by allowing you to build your
								trip together through sharing location ideas, places to stay,
								activity suggestions, discussions, an itinerary, photos, and
								expenses.
							</Header.Subheader>
						</Header>
						<Header className={"c-front"} size={"medium"}>
							Keep and Cherish Your Travel Experiences with Jurn(<em>ease</em>).
						</Header>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</div>
	)
}
