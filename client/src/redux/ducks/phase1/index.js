import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_PHASE1 = "phase1/GET_PHASE1"

const initialState = {
  locations: [],
  hotels: [],
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
            jname: resp.phase1.jname,
            hotels: resp.phase1.hotels
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

function createHotel(hotel, jurn_id) {
  return dispatch => {
    api.post("/hotel", { hotel, jurn_id }).catch()
  }
}

function finalChoices(location, hotel, jurn_id) {
  return new Promise((resolve, reject) => {
    api
      .post("/phase1", { location, hotel, jurn_id })
      .then(() => {
        resolve(jurn_id)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function usePhase1() {
  const dispatch = useDispatch()
  const jname = useSelector(appState => appState.Phase1State.jname)
  const locations = useSelector(appState => appState.Phase1State.locations)
  const hotels = useSelector(appState => appState.Phase1State.hotels)
  const updatePhase1 = jurn_id => dispatch(getPhase1(jurn_id))
  const sendLocation = (location, jname) => {
    dispatch(createLocation(location, jname))
  }
  const sendHotel = (hotel, jname) => {
    dispatch(createHotel(hotel, jname))
  }
  const updateChoices = (location, hotel, jurn_id) =>
    finalChoices(location, hotel, jurn_id)

  return {
    jname,
    locations,
    hotels,
    updatePhase1,
    sendLocation,
    sendHotel,
    updateChoices
  }
}
