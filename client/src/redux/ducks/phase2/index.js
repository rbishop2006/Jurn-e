import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_PHASE2 = "phase2/GET_PHASE2"

const initialState = {
  jurnInfo: {},
  // location: {},
  reminders: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PHASE2:
      return { ...state, ...action.payload }

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
          payload: {
            jurnInfo: resp.phase2.jname,
            // location: resp.phase2.location,
            reminders: resp.phase2.reminders
          }
        })
      })
      .catch()
  }
}

export function usePhase2() {
  const dispatch = useDispatch()
  const jurnInfo = useSelector(appState => appState.Phase2State.jurnInfo)
  // const location = useSelector(appState => appState.Phase2State.location)
  const reminders = useSelector(appState => appState.Phase2State.reminders)
  const updatePhase2 = jurn_id => dispatch(getPhase2(jurn_id))

  return { jurnInfo, reminders, updatePhase2 }
}
