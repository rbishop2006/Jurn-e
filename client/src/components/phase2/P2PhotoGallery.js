import React, { useEffect } from "react"
// import { useAside } from "../../hooks"
import { usePhase2 } from "../../hooks"
import "../../styles/phase2/Phase2PhotoGallery.scss"
import { CloudinaryContext, Image, Transformation } from "cloudinary-react"

export default (props) => {
	const { jurnInfo, fetchImages } = usePhase2()
	// const jurn_id = props.match.params.jurn_id
	const jurnName = jurnInfo.jname

	useEffect(() => {
		fetchImages(jurnName)
	})

	return (
		<div className="p2PhotoGallery">
			<CloudinaryContext cloudName="jurne">
				<Image publicId="JurnEase-picture2_nqpkv2" format="jpg">
					<Transformation
						crop="fill"
						gravity="faces"
						width="300"
						height="300"
					/>
				</Image>
			</CloudinaryContext>
		</div>
	)
}
