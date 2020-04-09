import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_ASIDE = "aside/GET_ASIDE"

const initialState = {
  jurns: [],
  user: {},
  pendJurns: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ASIDE:
      return { ...state, ...action.payload }

    default:
      return state
  }
}

function getAside() {
  return (dispatch) => {
    api
      .get("/aside")
      .then((resp) => {
        dispatch({
          type: GET_ASIDE,
          payload: {
            jurns: resp.aside.jurns,
            user: resp.aside.user,
            pendJurns: resp.aside.pendJurns,
          },
        })
      })
      .catch()
  }
}

function updateProfile(fname, lname, cellphone, avatar, user_id) {
  return (dispatch) => {
    api
      .patch("/updateprofile", { fname, lname, cellphone, avatar, user_id })
      .then((resp) => {
        dispatch(getAside())
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

function updateAccept(user_id, jurn_id) {
  return (dispatch) => {
    api
      .patch("/updateaccept", { user_id, jurn_id })
      .then((resp) => {
        dispatch(getAside())
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

function updateDecline(user_id, jurn_id) {
  return (dispatch) => {
    api
      .patch("/updateDecline", { user_id, jurn_id })
      .then((resp) => {
        dispatch(getAside())
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

function removeJurn(user_id, jurn_id) {
  return new Promise((resolve, reject) => {
    api
      .patch("/removejurne", { user_id, jurn_id })
      .then((resp) => {
        resolve(resp)
      })
      .catch((e) => {
        reject()
      })
  })
}

export function useAside() {
  const dispatch = useDispatch()
  const aJurns = useSelector((appState) => appState.AsideState.jurns)
  const aUser = useSelector((appState) => appState.AsideState.user)
  const pendingJurns = useSelector((appState) => appState.AsideState.pendJurns)
  const sendProfile = (fname, lname, cellphone, avatar, user_id) =>
    dispatch(updateProfile(fname, lname, cellphone, avatar, user_id))
  const fetchAside = () => dispatch(getAside())
  const sendAccept = (user_id, jurn_id) =>
    dispatch(updateAccept(user_id, jurn_id))
  const sendDecline = (user_id, jurn_id) =>
    dispatch(updateDecline(user_id, jurn_id))
  const delJurn = (user_id, jurn_id) => removeJurn(user_id, jurn_id)

  return {
    aJurns,
    aUser,
    pendingJurns,
    delJurn,
    fetchAside,
    sendProfile,
    sendDecline,
    sendAccept,
  }
}
