import React, { useEffect } from "react"
import Phase2Reminders from "./Phase2Reminders"
import Phase2Details from "./Phase2Details"
import { usePhase2 } from "../../hooks"
import "../../styles/phase2/phase2.scss"
import moment from "moment"

export default (props) => {
	const { jurnInfo, updatePhase2 } = usePhase2()

	const jurn_id = props.match.params.jurn_id

	useEffect(() => {
		updatePhase2(jurn_id)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [jurn_id])

	return (
		<div className="phase2">
			<h1 className="p2header">{jurnInfo.jname} </h1>
			<h4 className="p2dateRange">
				{jurnInfo.start_date &&
					moment(jurnInfo.start_date).format("MMM Do, YYYY") + " - "}
				{jurnInfo.end_date && moment(jurnInfo.end_date).format("MMM Do, YYYY")}
			</h4>
			<div className="phase2Reminders">
				<Phase2Reminders match={props.match} />
			</div>
			<div className="phase2Details">
				<Phase2Details match={props.match} />
			</div>
		</div>
	)
}
