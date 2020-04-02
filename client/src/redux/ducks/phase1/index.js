import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_PHASE1 = "phase1/GET_PHASE1"

const initialState = {
  locations: [],
  hotels: [],
  dateRange: [],
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
            hotels: resp.phase1.hotels,
            dateRange: resp.phase1.dateRange
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

function createDateRange(date, jurn_id) {
  return dispatch => {
    api.post("/dates", { date, jurn_id }).catch()
  }
}

function createInvite(firstName, lastName, jurn_id) {
  return dispatch => {
    api.post("/invite", { firstName, lastName, jurn_id }).catch()
  }
}

function finalChoices(location, hotel, date, jurn_id) {
  return new Promise((resolve, reject) => {
    api
      .post("/phase1", { location, hotel, date, jurn_id })
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
  const dateRange = useSelector(appState => appState.Phase1State.dateRange)
  const updatePhase1 = jurn_id => dispatch(getPhase1(jurn_id))
  const sendLocation = (location, jname) => {
    dispatch(createLocation(location, jname))
  }
  const sendHotel = (hotel, jname) => {
    dispatch(createHotel(hotel, jname))
  }
  const sendDates = (date, jname) => {
    dispatch(createDateRange(date, jname))
  }
  const updateChoices = (location, hotel, date, jurn_id) =>
    finalChoices(location, hotel, date, jurn_id)
  const sendInvite = (firstName, lastName, jurn_id) => {
    dispatch(createInvite(firstName, lastName, jurn_id))
  }

  return {
    jname,
    locations,
    hotels,
    dateRange,
    updatePhase1,
    sendLocation,
    sendHotel,
    sendDates,
    updateChoices,
    sendInvite
  }
}
