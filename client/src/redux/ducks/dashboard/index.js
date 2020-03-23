import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_JURNS = "dashboard/GET_JURNS"

const initialState = {
  jurns: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_JURNS:
      return { dashboard: action.payload }
    default:
      return state
  }
}

function getJurns() {
  return dispatch => {
    api
      .get("/dashboard")
      .then(resp => {
        dispatch({
          type: GET_JURNS,
          payload: resp.data.dashboard
        })
      })
      .catch()
  }
}

function createJurn(user_id, jname, fam_id) {
  return dispatch => {
    api.post("/dashboard", { user_id, jname, fam_id }).then(resp => {
      dispatch(getJurns())
    })
  }
}

export function useJurns() {
  const dispatch = useDispatch()
  const jurns = useSelector(appState => appState.JurnsState.jurns)
  const sendJurn = (user_id, jname, fam_id) => {
    dispatch(createJurn(user_id, jname, fam_id))
  }
  const get = () => dispatch(getJurns())

  return { jurns, get, sendJurn }
}
