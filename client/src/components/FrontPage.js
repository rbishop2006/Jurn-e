import React from "react"
import { Link } from "react-router-dom"
import { Button } from "semantic-ui-react"
import "../styles/FrontPage.scss"

export default (props) => {
	return (
		<div id="frontWrapper">
			<div className="frontHeader">
				<Link to="/login" className="logIn">
					Log in
				</Link>
				<Link to="/register" className="signUp">
					{/* <Button type="button" className="signUp"> */}
					Sign up for <em>free</em>
					{/* </Button> */}
				</Link>
			</div>
			<div className="frontImage"></div>
			<div className="frontMain">
				<div className="tagline">
					<h1>Traveling with family or friends?</h1>
					<p>
						The first step in any journey is planning. Jurn(<em>ease</em>) makes
						that a collaborative process by allowing you to build your trip
						together through sharing location ideas, places to stay, activity
						suggestions, discussions, an itinerary, photos, and expenses.
					</p>
					<h3>
						Keep and Cherish Your Travel Experiences with Jurn(<em>ease</em>).
					</h3>
				</div>
			</div>
		</div>
	)
}
