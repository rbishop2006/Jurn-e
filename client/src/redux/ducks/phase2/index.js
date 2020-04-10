import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_PHASE2 = "phase2/GET_PHASE2"

const initialState = {
  jurnInfo: {},
  activities: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PHASE2:
      return {
        ...state,
        jurnInfo: action.payload.jname,
        activities: action.payload.activities
      }

    default:
      return state
  }
}

function getPhase2(jurn_id) {
  return dispatch => {
    api
      .get("/phase2/" + jurn_id)
      .then(resp => {
        dispatch({
          type: GET_PHASE2,
          payload: resp.phase2
        })
      })
      .catch()
  }
}

export function usePhase2() {
  const dispatch = useDispatch()
  const jurnInfo = useSelector(appState => appState.Phase2State.jurnInfo)
  const activities = useSelector(appState => appState.Phase2State.activities)
  const updatePhase2 = jurn_id => dispatch(getPhase2(jurn_id))

  return { jurnInfo, activities, updatePhase2 }
}
