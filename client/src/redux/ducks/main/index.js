import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_MAIN = "MAIN/GET_Main"

const initialState = {
  jurns: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MAIN:
      return { ...state, ...action.payload }

    default:
      return state
  }
}

function getMain() {
  return dispatch => {
    api
      .get("/main")
      .then(resp => {
        dispatch({
          type: GET_MAIN,
          payload: {
            jurns: resp.main
          }
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

export function useMain() {
  const dispatch = useDispatch()
  const jurns = useSelector(appState => appState.MainState.jurns)

  const get = () => dispatch(getMain())
  const sendJurn = (user_id, jname) => createJurn(user_id, jname)

  return { jurns, get, sendJurn }
}
