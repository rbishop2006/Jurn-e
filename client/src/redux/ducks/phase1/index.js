import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_PHASE1 = "phase1/GET_PHASE1"

const initialState = {
  locations: [],
  jname: {}
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
          payload: {
            locations: resp.phase1.locations,
            jname: resp.phase1.jname
          }
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
    api.post("/phase1", { location, jurn_id }).catch()
  }
}

export function usePhase1() {
  const dispatch = useDispatch()
  const jname = useSelector(appState => appState.Phase1State.jname)
  const locations = useSelector(appState => appState.Phase1State.locations)
  const updatePhase1 = jurn_id => dispatch(getPhase1(jurn_id))
  const sendLocation = (location, jname) => {
    dispatch(createLocation(location, jname))
  }
  const updateChoices = (location, jurn_id) =>
    dispatch(finalChoices(location, jurn_id))

  return { jname, locations, updatePhase1, sendLocation, updateChoices }
}
