import React, { useEffect, useState } from "react"
import { Form, Button } from "semantic-ui-react"
// import { useAside } from "../../hooks"
// import { usePhase2, useRems } from "../../hooks"
import "../../styles/phase2/P2PhotoUpload.scss"
import validator from "validator"

export default (props) => {
	const jurn_id = props.match.params.jurn_id
	const [photoInput, setPhotoInput] = useState("")
	const [selectedFile, setSelectedFile] = useState("")
	const [previewSrc, setPreviewSrc] = useState("")

	function handlePhotoSubmit(e) {
		e.preventDefault()
		let valid = true

		// if (validator.isEmpty(photo)) {
		// 	valid = false
		// }
		// if (valid) {
		// 	addRem(reminder, jurn_id)
		// 	setReminder("")
		// }
	}

	function handlePhotoInput(e) {
		e.preventDefault()
		const file = e.target.files[0]

		previewFile(file)
	}

	function previewFile(file) {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onloadend = () => {
			setPreviewSrc(reader.result)
		}
	}

	return (
		<div className="p2PhotosForm">
			<Form onSubmit={handlePhotoSubmit}>
				<Form.Input
					name="image"
					type="file"
					className="file-upload"
					label="add Photos of Jurn(e) here..."
					data-cloudinary-field="image_id"
					data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"
					onChange={handlePhotoInput}
					value={photoInput}
				/>
				<Button className="photoSubmit" type="submit">
					Submit
				</Button>
				<div>{previewSrc && <img src={previewSrc} alt="chosen file" />}</div>
			</Form>
		</div>
	)
}
