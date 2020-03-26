import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_LOCATIONS = "phase1/GET_LOCATIONS"

const initialState = {
  locations: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATIONS:
      return { ...state, ...action.payload }

    default:
      return state
  }
}

function getLocations() {
  return dispatch => {
    api
      .get("/location")
      .then(resp => {
        console.log(resp)
        dispatch({
          type: GET_LOCATIONS,
          payload: resp.data
        })
      })
      .catch()
  }
}

function createLocation(location, jname) {
  return dispatch => {
    api.post("/location", { location, jname }).catch()
  }
}

export function useLocations() {
  const dispatch = useDispatch()
  const locations = useSelector(appState => appState.LocationsState.locations)
  const getLocs = () => dispatch(getLocations())
  const sendLocation = (location, jname) => {
    dispatch(createLocation(location, jname))
  }

  return { locations, getLocs, sendLocation }
}