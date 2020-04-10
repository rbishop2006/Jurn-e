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

function getRems(jurn_id, user_id) {
  return dispatch => {
    api.get(`/reminders/${jurn_id}/${user_id}`).then(resp => {
      dispatch(getRemsCount(jurn_id, user_id))
      dispatch({
        type: GET_REMS,
        payload: resp
      })
    })
  }
}

function addReminder(reminder, jurn_id, user_id) {
  return dispatch => {
    api.post("/addrem", { reminder, jurn_id, user_id }).then(resp => {
      dispatch(getRems(jurn_id, user_id))
    })
  }
}

function toggleReminder(rem_id, jurn_id, user_id) {
  return dispatch => {
    api.get("/togglerem/" + rem_id).then(resp => {
      const status = resp.status
      const rem_id = resp.rem_id
      if (status === "completed") {
        api.patch("/reminder", { rem_id, status: "active" }).then(resp => {
          dispatch(getRems(jurn_id, user_id))
        })
      } else {
        api.patch("/reminder", { rem_id, status: "completed" }).then(resp => {
          dispatch(getRems(jurn_id, user_id))
        })
      }
    })
  }
}

function filterReminders(status, jurn_id, user_id) {
  return dispatch => {
    let query = ""
    if (status === "all") {
      query = ""
    } else if (status === "completed") {
      query = "?status=completed"
    } else if (status === "active") {
      query = "?status=active"
    }
    api.get(`/reminders/${jurn_id}/${user_id}${query}`).then(resp => {
      dispatch({
        type: GET_REMS,
        payload: resp
      })
      dispatch(getRemsCount(jurn_id, user_id))
    })
  }
}

function getRemsCount(jurn_id, user_id) {
  return dispatch => {
    api.get(`/reminders/${jurn_id}/${user_id}?status=active`).then(resp => {
      dispatch({
        type: SET_REMSCOUNT,
        payload: resp.length
      })
    })
  }
}

function clearReminders(jurn_id, user_id) {
  return dispatch => {
    api.get(`/reminders/${jurn_id}/${user_id}?status=completed`).then(resp => {
      //Broken down here, getting [] as resp
      Promise.all(
        resp.map(
          rem =>
            new Promise((resolve, reject) => {
              api.delete("/reminder/" + rem.rem_id).then(resp => {
                resolve()
              })
            })
        )
      ).then(values => {
        dispatch(getRems(jurn_id, user_id))
      })
    })
  }
}

export function useRems() {
  const dispatch = useDispatch()
  const rems = useSelector(appState => appState.RemindersState.rems)
  const remsCount = useSelector(appState => appState.RemindersState.remsCount)
  const addRem = (reminder, jurn_id, user_id) =>
    dispatch(addReminder(reminder, jurn_id, user_id))
  const toggleRem = (rem_id, jurn_id, user_id) =>
    dispatch(toggleReminder(rem_id, jurn_id, user_id))
  const filterRems = (status, jurn_id, user_id) =>
    dispatch(filterReminders(status, jurn_id, user_id))
  const clearRems = (jurn_id, user_id) =>
    dispatch(clearReminders(jurn_id, user_id))
  const updateRems = (jurn_id, user_id) => dispatch(getRems(jurn_id, user_id))

  return {
    rems,
    remsCount,
    addRem,
    toggleRem,
    filterRems,
    clearRems,
    updateRems
  }
}
