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
	jurnTag = jurnTag.replace(/\s/g, "")
	return (dispatch) => {
		api.post("/images", { image, jurnTag })
	}
}

// Gets all images with tag of the Jurn name
function getImages(jurnName) {
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
