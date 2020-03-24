import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { api } from "react-auth"

const GET_DASHBOARD = "dashboard/GET_DASHBOARD"

const initialState = {
  dashboard: {}
  // jurns: [],
  // user: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD:
      return { ...state, dashboard: action.payload }
    // trying get_user
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
          payload: resp.dashboard
        })
        // console.log(resp)
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
  // const jurns = useSelector(appState => appState.JurnsState.jurns)
  // const user = useSelector(appState => appState.UserState.user)
  const dashboard = useSelector(appState => appState.DashboardState.dashboard)
  const get = () => dispatch(getDashboard())
  const sendJurn = (user_id, jname, fam_id) => {
    dispatch(createJurn(user_id, jname, fam_id))
  }

  return { get, sendJurn, dashboard }
  // jurns, user,
}
