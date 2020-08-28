import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_PHASE2 = "phase2/GET_PHASE2"

const initialState = {
	jurnInfo: {},
	activities: [],
}

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_PHASE2:
			return {
				...state,
				jurnInfo: action.payload.jname,
				activities: action.payload.activities,
			}

		default:
			return state
	}
}

function getPhase2(jurn_id) {
	return (dispatch) => {
		api
			.get("/phase2/" + jurn_id)
			.then((resp) => {
				dispatch({
					type: GET_PHASE2,
					payload: resp.phase2,
				})
			})
			.catch()
	}
}

// Sends an image to cloudinary and tags it with Jurn name
function postImage(image, jurnTag) {
	return (dispatch) => {
		// change the tag name to remove spaces
		api.post("/images", { image, jurnTag })
	}
}

// Gets all images with tag of Jurn name
function getImages(jurnName) {
	//  Look for regEx in .replace - this doesn't look right
	const jurnTag = jurnName && jurnName.replace(/\s/g, "")
	console.log(jurnTag)
	return (dispatch) => {
		api.get("/images/" + jurnTag)
	}
}

export function usePhase2() {
	const dispatch = useDispatch()
	const jurnInfo = useSelector((appState) => appState.Phase2State.jurnInfo)
	const activities = useSelector((appState) => appState.Phase2State.activities)
	const updatePhase2 = (jurn_id) => dispatch(getPhase2(jurn_id))
	const sendImage = (image, jurnTag) => dispatch(postImage(image, jurnTag))
	const fetchImages = (jurnName) => dispatch(getImages(jurnName))

	return { jurnInfo, activities, updatePhase2, sendImage, fetchImages }
}
