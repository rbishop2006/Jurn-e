import React from "react"
import P2PhotoUpload from "./P2PhotoUpload"
import P2PhotoGallery from "./P2PhotoGallery"

export default (props) => {
	return (
		<div className="p2PhotosDiv">
			<P2PhotoUpload match={props.match} />
			<P2PhotoGallery match={props.match} />
		</div>
	)
}
