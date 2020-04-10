import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_PHASE1 = "phase1/GET_PHASE1"

const initialState = {
  locations: [],
  hotels: [],
  dateRanges: [],
  jname: {},
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
  return (dispatch) => {
    api
      .get("/phase1/" + jurn_id)
      .then((resp) => {
        dispatch({
          type: GET_PHASE1,
          payload: {
            locations: resp.phase1.locations,
            jname: resp.phase1.jname,
            hotels: resp.phase1.hotels,
            dateRanges: resp.phase1.dateRange,
          },
        })
      })
      .catch()
  }
}

function createLocation(location, jurn_id) {
  return (dispatch) => {
    api.post("/location", { location, jurn_id }).catch()
  }
}

function createHotel(hotel, jurn_id) {
  return (dispatch) => {
    api.post("/hotel", { hotel, jurn_id }).catch()
  }
}

function createDateRange(date, jurn_id) {
  return (dispatch) => {
    api.post("/dates", { date, jurn_id }).catch()
  }
}

function finalDates(date, jurn_id) {
  return new Promise((resolve, reject) => {
    api
      .patch("/finaldates", { date, jurn_id })
      .then(() => {
        resolve(jurn_id)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function finalLocation(location, jurn_id) {
  return new Promise((resolve, reject) => {
    api
      .patch("/finallocation", { location, jurn_id })
      .then(() => {
        resolve(jurn_id)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function finalHotel(hotel, jurn_id) {
  return new Promise((resolve, reject) => {
    api
      .patch("/finalhotel", { hotel, jurn_id })
      .then(() => {
        resolve(jurn_id)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function finalPhoto(jurn_id, photo) {
  return new Promise((resolve, reject) => {
    api
      .patch("/finalphoto", { jurn_id, photo })
      .then(() => {
        resolve(jurn_id)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function usePhase1() {
  const dispatch = useDispatch()
  const jname = useSelector((appState) => appState.Phase1State.jname)
  const locations = useSelector((appState) => appState.Phase1State.locations)
  const hotels = useSelector((appState) => appState.Phase1State.hotels)
  const dateRanges = useSelector((appState) => appState.Phase1State.dateRanges)
  const updatePhase1 = (jurn_id) => dispatch(getPhase1(jurn_id))
  const sendLocation = (location, jname) => {
    dispatch(createLocation(location, jname))
  }
  const sendHotel = (hotel, jname) => {
    dispatch(createHotel(hotel, jname))
  }
  const sendDates = (date, jname) => {
    dispatch(createDateRange(date, jname))
  }
  const updateFinalDates = (date, jurn_id) => finalDates(date, jurn_id)
  const updateFinalLocation = (location, jurn_id) =>
    finalLocation(location, jurn_id)
  const updateFinalHotel = (hotel, jurn_id) => finalHotel(hotel, jurn_id)
  const updatePhoto = (jurn_id, photo) => finalPhoto(jurn_id, photo)

  return {
    jname,
    locations,
    hotels,
    dateRanges,
    updatePhase1,
    sendLocation,
    sendHotel,
    sendDates,
    updateFinalDates,
    updateFinalLocation,
    updateFinalHotel,
    updatePhoto,
  }
}
