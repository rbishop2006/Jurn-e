import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_DASHBOARD = "dashboard/GET_DASHBOARD"

const initialState = {
  jurns: [],
  user: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD:
      return { ...state, ...action.payload }

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
          payload: {
            jurns: resp.dashboard.jurns,
            user: resp.dashboard.user
          }
        })
      })
      .catch()
  }
}

function createJurn(user_id, jname) {
  return dispatch => {
    api.post("/jurn", { user_id, jname }).then(resp => {
      dispatch(getDashboard())
    })
  }
}

export function useDashboard() {
  const dispatch = useDispatch()
  const jurns = useSelector(appState => appState.DashboardState.jurns)
  const user = useSelector(appState => appState.DashboardState.user)

  const get = () => dispatch(getDashboard())
  const sendJurn = (user_id, jname) => {
    dispatch(createJurn(user_id, jname))
  }

  return { jurns, user, get, sendJurn }
}
