import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_PHASE2 = "phase2/GET_PHASE2"

const initialState = {
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
      .get("/phase2" + jurn_id)
      .then(resp => {
        dispatch({
          type: GET_PHASE2,
          payload: {
            reminders: resp.reminders
          }
        })
      })
      .catch()
  }
}

export function usePhase2() {
  const dispatch = useDispatch()
  const reminders = useSelector(appState => appState.Phase2State.reminders)
  const getP2 = jurn_id => dispatch(getPhase2(jurn_id))

  return { reminders, getP2 }
}
