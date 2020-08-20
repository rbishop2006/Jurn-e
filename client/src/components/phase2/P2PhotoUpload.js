import React, { useEffect, useState } from "react"
import { Form, Button } from "semantic-ui-react"
// import { useAside } from "../../hooks"
import { usePhase2 } from "../../hooks"
import "../../styles/phase2/P2PhotoUpload.scss"
import validator from "validator"

export default (props) => {
	const { jurnInfo, updatePhase2, sendImage } = usePhase2()
	const [photoInput, setPhotoInput] = useState("")
	// const [selectedFile, setSelectedFile] = useState("")
	const [previewSrc, setPreviewSrc] = useState("")
	const jurnName = jurnInfo.jname

	console.log(previewSrc)

	// For single file
	// function handlePhotoInput(e) {
	// 	e.preventDefault()
	// 	console.log(e.target.files)
	// 	const file = e.target.files[0]
	// 	previewFile(file)
	// }

	// function previewFile(file) {
	// 	const reader = new FileReader()
	// 	reader.readAsDataURL(file)
	// 	reader.onloadend = () => {
	// 		setPreviewSrc(reader.result)
	// 	}
	// }

	// // For multiple files
	// function handlePhotoInput(e) {
	// 	e.preventDefault()
	// 	console.log(e.target.files)
	// 	const files = e.target.files
	// 	previewFile(files)
	// }

	// function previewFile(files) {
	// 	const newFiles = []
	// 	for (const file in files) {
	// 		const reader = new FileReader()
	// 		reader.readAsDataURL(file)
	// 		reader.onloadend = () => {
	// 			newFiles.push(reader.result)
	// 		}
	// 	}

	// 	setPreviewSrc(newFiles)
	// }

	// Try this for multiple files
	function previewFiles(e) {
		// const files = document.querySelector("input[type=file]").files
		const files = e.target.files

		function readAndPreview(file) {
			// Make sure `file.name` matches our extensions criteria
			if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
				const reader = new FileReader()

				reader.addEventListener(
					"load",
					function () {
						var image = new Image()
						image.height = 100
						image.title = file.name
						image.src = this.result
					},
					false
				)

				reader.readAsDataURL(file)
			}
		}

		if (files) {
			;[].forEach.call(files, readAndPreview)
		}
	}

	function handlePhotoSubmit(e) {
		e.preventDefault()
		if (!previewSrc) {
			return
		} else {
			uploadImage(previewSrc)
		}
	}

	const uploadImage = (base64EncodedImage) => {
		const jurnTag = jurnName
		sendImage(base64EncodedImage, jurnTag)
	}

	return (
		<div className="p2PhotosForm">
			<Form onSubmit={handlePhotoSubmit}>
				<Form.Input
					name="image"
					type="file"
					className="file-upload"
					label="add Photos of this Jurn(e)"
					data-cloudinary-field="image_id"
					// data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"
					onChange={previewFiles}
					// value={photoInput}
					multiple
				/>
				<Button className="photoSubmit" type="submit">
					Submit
				</Button>
			</Form>
			<div className="previewDiv">
				{previewSrc && <img src={previewSrc} alt="chosen file" />}
			</div>
		</div>
	)
}
