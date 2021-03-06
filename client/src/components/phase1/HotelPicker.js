import React, { useState, useEffect } from "react"
import { Form, Button, Radio, Icon } from "semantic-ui-react"
import { usePhase1, usePhase2 } from "../../hooks"
import "../../styles/phase1/hotels.scss"
import validator from "validator"

export default (props) => {
	const { updatePhase1, sendHotel, updateFinalHotel, hotels } = usePhase1()
	const { jurnInfo, updatePhase2 } = usePhase2()
	const jurn_id = props.match.params.jurn_id
	const [hotel, setHotel] = useState("")
	const [finalHotel, setFinalHotel] = useState("")

	function handleHotSug(e) {
		e.preventDefault()

		let valid = true

		if (validator.isEmpty(hotel)) {
			valid = false
		}
		if (valid) {
			sendHotel(hotel, jurn_id)
		}
		setHotel("")
		updatePhase1(jurn_id)
	}

	function handleFinalHotel(e) {
		e.preventDefault()
		updateFinalHotel(finalHotel, jurn_id)
		setFinalHotel("")
		updatePhase2(jurn_id)
	}

	useEffect(() => {
		updatePhase2(jurn_id)
		updatePhase1(jurn_id)
	}, [jurn_id, hotel, finalHotel])

	return (
		<div className="suggestHotDiv">
			<Form onSubmit={handleHotSug}>
				<h3>Current Selection:</h3>
				<h4 className="">{jurnInfo.hotel}</h4>
				<Form.Group className="hotelSect">
					<Form.Input
						fluid
						label="add Accommodation Suggestions here..."
						placeholder="ex. Four Seasons Maui"
						value={hotel}
						onChange={(e) => setHotel(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className="hotRadios">
					<Form.Field>
						{hotels.map((hotel, i) => (
							<Radio
								key={"hotel" + i}
								label={hotel.hotel}
								name="radioGroup2"
								value={hotel.hotel}
								onChange={(e) => setFinalHotel(hotel.hotel)}
								checked={hotel.hotel === finalHotel}
							/>
						))}
					</Form.Field>
				</Form.Group>
			</Form>
			<div className="currentHotAndButton">
				<Form onSubmit={handleFinalHotel} className="commitLocation">
					<Button type="submit">
						<span>
							{" "}
							Save Choice <Icon name="check circle" />{" "}
						</span>
					</Button>
				</Form>
			</div>
		</div>
	)
}
