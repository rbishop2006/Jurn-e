import React, { useState, useEffect } from "react"
import { Form, Button, Dropdown, Icon } from "semantic-ui-react"
import { usePhase1, usePhase2 } from "../../hooks"
import validator from "validator"
import "../../styles/phase1/photos.scss"

export default (props) => {
	const jurn_id = props.match.params.jurn_id
	const [photo, setPhoto] = useState("")
	const { updatePhase1, updatePhoto } = usePhase1()
	const { jurnInfo, updatePhase2 } = usePhase2()

	const pictures = [
		{
			image: { src: `/JurnEase-picture2.jpeg` },
			text: "Jurn(ease)",
			value: "/JurnEase-picture2.jpeg",
			as: Dropdown.Item,
		},
		{
			image: { src: `/beach.jpg` },
			text: "Beach vacation",
			value: "/beach.jpg",
			as: Dropdown.Item,
		},
		{
			image: { src: `/drinks.jpg` },
			text: "Night on the Town",
			value: "/drinks.jpg",
			as: Dropdown.Item,
		},
		{
			image: { src: `/downtown.jpg` },
			text: "Big City Adventure",
			value: "/downtown.jpg",
			as: Dropdown.Item,
		},
		{
			image: { src: `/lasVegas.jpg` },
			text: "Vegas Baby!",
			value: "/lasVegas.jpg",
			as: Dropdown.Item,
		},
		{
			image: { src: `/golfCourse.jpg` },
			text: "Golf Getaway",
			value: "/golfCourse.jpg",
			as: Dropdown.Item,
		},
		{
			image: { src: `/nature.jpg` },
			text: "Back to Nature",
			value: "/nature.jpg",
			as: Dropdown.Item,
		},
		{
			image: { src: `/lakeHouse.jpg` },
			text: "Lake Retreat",
			value: "/lakeHouse.jpg",
			as: Dropdown.Item,
		},
		{
			image: { src: `/cruiseShip.jpg` },
			text: "Lets Cruise",
			value: "/cruiseShip.jpg",
			as: Dropdown.Item,
		},
	]

	function sendPhoto(e) {
		e.preventDefault()
		let valid = true

		if (validator.isEmpty(photo)) {
			valid = false
		}
		if (valid) {
			updatePhoto(jurn_id, photo)
		}
		updatePhase1(jurn_id)
		updatePhase2(jurn_id)
	}

	useEffect(() => {
		updatePhase2(jurn_id)
	}, [jurn_id, jurnInfo])

	return (
		<div className="photoDiv">
			<Form onSubmit={sendPhoto} className="photoForm">
				<div className="currentPhoto">
					<h3>Current Photo:</h3>
					<img src={jurnInfo.photo} alt="Jurn(e) Cover shot" />
				</div>
				<div className="photoSel">
					<Dropdown
						id="dropdown"
						placeholder="Change Photo"
						labeled
						options={pictures}
						button
						value={photo}
						onChange={(e, { value }) => setPhoto(value)}
					/>

					<Button type="submit" className="updateProfile">
						<span>
							Update Jurn(<em>e</em>) Photo <Icon name="camera" />
						</span>
					</Button>
				</div>
			</Form>
		</div>
	)
}
