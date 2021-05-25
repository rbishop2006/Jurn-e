import React from "react"
import Main from "./Main"
import Header from "./Header"
import Aside from "../aside/Aside"
import JnamePhase1 from "../phase1/JnamePhase1"
import JnamePhase2 from "../phase2/JnamePhase2"
import "../../styles/dashboard/Dashboard.scss"
import { Route } from "react-router-dom"

export default (props) => {
	return (
		<div id="grid">
			<Aside history={props.history} />
			<Header history={props.history} />
			<main>
				<Route
					exact
					path="/Dashboard/main"
					component={Main}
					history={props.history}
				/>
				<Route
					exact
					path="/Dashboard/Jurne/:jurn_id"
					component={JnamePhase1}
					history={props.history}
				/>
				<Route
					path="/Dashboard/final/:jurn_id"
					component={JnamePhase2}
					history={props.history}
				/>
			</main>
		</div>
	)
}
