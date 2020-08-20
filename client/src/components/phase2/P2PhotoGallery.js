import React, { useEffect, useState } from "react"
// import { useAside } from "../../hooks"
// import { usePhase2, useRems } from "../../hooks"
import "../../styles/phase2/Phase2Photos.scss"
import { CloudinaryContext, Image, Transformation } from "cloudinary-react"

export default (props) => {
	const jurn_id = props.match.params.jurn_id

	return (
		<div className="p2PhotoGallery">
			<CloudinaryContext cloudName="jurne">
				<Image
					publicId="https://res.cloudinary.com/jurne/image/upload/v1597183579/JurnEase-picture2_nqpkv2.jpg"
					format="jpg"
				>
					<Transformation
						crop="fill"
						gravity="faces"
						width="300"
						height="200"
					/>
				</Image>
			</CloudinaryContext>
		</div>
	)
}
