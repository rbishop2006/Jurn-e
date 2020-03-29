import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_REMS = "reminders/GET_REMS"
const SET_REMSCOUNT = "reminders/SET_REMSCOUNT"

const initialState = {
  rems: [],
  remsCount: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_REMS:
      return { ...state, rems: action.payload }
    case SET_REMSCOUNT:
      return { ...state, remsCount: action.payload }

    default:
      return state
  }
}

function getRems(jurn_id) {
  return dispatch => {
    api.get("/reminders/" + jurn_id).then(resp => {
      dispatch(getRemsCount(jurn_id))
      dispatch({
        type: GET_REMS,
        payload: resp
      })
    })
  }
}

function getRemsCount(jurn_id) {
  console.log(jurn_id)
  return dispatch => {
    api.get(`/reminders/${jurn_id}?status=active`).then(resp => {
      console.log(resp)
      dispatch({
        type: SET_REMSCOUNT,
        payload: resp.length
      })
    })
  }
}

export function useRems() {
  const dispatch = useDispatch()
  const rems = useSelector(appState => appState.RemindersState.rems)
  const remsCount = useSelector(appState => appState.RemindersState.remsCount)
  const updateRems = jurn_id => dispatch(getRems(jurn_id))
  console.log(remsCount)
  return { rems, remsCount, updateRems }
}
