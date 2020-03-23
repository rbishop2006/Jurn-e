import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_DASHBOARD = "dashboard/GET_DASHBOARD"

const initialState = {
  jurns: [],
  user: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD:
      return { dashboard: action.payload }
    // case GET_USER:
    //   return { dashboard: action.payload }
    default:
      return state
  }
}

function getDashboard() {
  return dispatch => {
    api
      .get("/dashboard")
      .then(resp => {
        dispatch({
          type: GET_DASHBOARD,
          payload: resp.data.dashboard
        })
      })
      .catch()
  }
}

function createJurn(user_id, jname, fam_id) {
  return dispatch => {
    api.post("/jurn", { user_id, jname, fam_id }).then(resp => {
      dispatch(getDashboard())
    })
  }
}

export function useDashboard() {
  const dispatch = useDispatch()
  const jurns = useSelector(appState => appState.JurnsState.jurns)
  const user = useSelector(appState => appState.UserState.user)
  const sendJurn = (user_id, jname, fam_id) => {
    dispatch(createJurn(user_id, jname, fam_id))
  }
  const get = () => dispatch(getDashboard())

  return { jurns, user, get, sendJurn }
}
