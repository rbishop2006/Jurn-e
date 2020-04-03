import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_ASIDE = "aside/GET_ASIDE"

const initialState = {
  jurns: [],
  user: {},
  pendJurns: []
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
  return dispatch => {
    api
      .get("/aside")
      .then(resp => {
        dispatch({
          type: GET_ASIDE,
          payload: {
            jurns: resp.aside.jurns,
            user: resp.aside.user,
            pendJurns: resp.aside.pendJurns
          }
        })
      })
      .catch()
  }
}

function updateProfile(fname, lname, cellphone, avatar, user_id) {
  return dispatch => {
    api
      .patch("/updateprofile", { fname, lname, cellphone, avatar, user_id })
      .then(resp => {
        dispatch(getAside())
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export function useAside() {
  const dispatch = useDispatch()
  const aJurns = useSelector(appState => appState.AsideState.jurns)
  const aUser = useSelector(appState => appState.AsideState.user)
  const pendingJurns = useSelector(appState => appState.AsideState.pendJurns)
  const sendProfile = (fname, lname, cellphone, avatar, user_id) =>
    dispatch(updateProfile(fname, lname, cellphone, avatar, user_id))
  const fetchAside = () => dispatch(getAside())

  return { aJurns, aUser, pendingJurns, fetchAside, sendProfile }
}
