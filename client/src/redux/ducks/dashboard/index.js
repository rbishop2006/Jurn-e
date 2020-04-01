import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_DASHBOARD = "dashboard/GET_DASHBOARD"

const initialState = {
  jurns: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD:
      return { ...state, jurns: action.payload }

    default:
      return state
  }
}

function getDashboard() {
  return dispatch => {
    api
      .get("/dashboard")
      .then(resp => {
        console.log(resp)
        dispatch({
          type: GET_DASHBOARD,
          payload: resp.dashboard
        })
      })
      .catch()
  }
}

function createJurn(user_id, jname) {
  return new Promise((resolve, reject) => {
    api
      .post("/jurn", { user_id, jname })
      .then(resp => {
        resolve(resp.id)
      })
      .catch(e => {
        reject()
      })
  })
}

export function useDashboard() {
  const dispatch = useDispatch()
  const jurns = useSelector(appState => appState.DashboardState.jurns)

  const get = () => dispatch(getDashboard())
  const sendJurn = (user_id, jname) => createJurn(user_id, jname)

  return { jurns, get, sendJurn }
}
