import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_ASIDE = "aside/GET_ASIDE"

const initialState = {
  jurns: [],
  user: {}
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
        console.log(resp)
        dispatch({
          type: GET_ASIDE,
          payload: {
            jurns: resp.aside.jurns,
            user: resp.aside.user
          }
        })
      })
      .catch()
  }
}

export function useAside() {
  const dispatch = useDispatch()
  const aJurns = useSelector(appState => appState.AsideState.jurns)
  const aUser = useSelector(appState => appState.AsideState.user)

  const fetchAside = () => dispatch(getAside())

  return { aJurns, aUser, fetchAside }
}
