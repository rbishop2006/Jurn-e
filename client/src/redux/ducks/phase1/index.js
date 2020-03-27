import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_PHASE1 = "phase1/GET_PHASE1"

const initialState = {
  phase1: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PHASE1:
      return { ...state, ...action.payload }

    default:
      return state
  }
}

function getPhase1(jurn_id) {
  return dispatch => {
    api
      .get("/phase1/" + jurn_id)
      .then(resp => {
        dispatch({
          type: GET_PHASE1,
          payload: resp
        })
      })
      .catch()
  }
}

function createLocation(location, jurn_id) {
  return dispatch => {
    api.post("/location", { location, jurn_id }).catch()
  }
}

function finalChoices(location, jurn_id) {
  return dispatch => {
    api.patch("/jurn", { location, jurn_id }).catch()
  }
}

export function usePhase1() {
  const dispatch = useDispatch()
  const phase1 = useSelector(appState => appState.Phase1State.locations)
  const updatePhase1 = jurn_id => dispatch(getPhase1(jurn_id))
  const sendLocation = (location, jname) => {
    dispatch(createLocation(location, jname))
  }
  const updateChoices = (location, jurn_id) =>
    dispatch(finalChoices(location, jurn_id))

  return { phase1, updatePhase1, sendLocation, updateChoices }
}
