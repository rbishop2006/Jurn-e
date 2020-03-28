import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_PHASE2 = "phase2/GET_PHASE2"

const initialState = {
  phase2: []
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
        console.log(resp)
        dispatch({
          type: GET_PHASE2,
          payload: resp
        })
      })
      .catch()
  }
}

export function usePhase2() {
  const dispatch = useDispatch()
  const phase2 = useSelector(appState => appState.Phase2State.phase2)
  const getP2 = jurn_id => dispatch(getPhase2(jurn_id))

  return { phase2, getP2 }
}
