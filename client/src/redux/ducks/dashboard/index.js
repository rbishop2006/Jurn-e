import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_DASHBOARD = "dashboard/GET_DASHBOARD"

const initialState = {
  dashboard: ""
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD:
      return { dashboard: action.payload }
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

export function useDashboard() {
  const dispatch = useDispatch()
  const dashboard = useSelector(appState => appState.dashboardState.dashboard)
  const get = () => dispatch(getDashboard())

  return { dashboard, get }
}
