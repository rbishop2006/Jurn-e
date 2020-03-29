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

//still testing addRem

function addReminder(jurn_id, item) {
  return dispatch => {
    api.post("/addrem/" + jurn_id, item).then(resp => {
      dispatch(getRems(jurn_id))
    })
  }
}

//working on delete
function deleteRem(jurn_id, rem_id) {
  return dispatch => {
    api.delete("/delrem/" + rem_id, jurn_id).then(resp => {
      dispatch(getRems(jurn_id))
    })
  }
}

//working on toggle
function toggleReminder(jurn_id, rem_id) {
  return dispatch => {
    api.get("/reminder/" + rem_id).then(resp => {
      const reminder = resp.data
      if (reminder.status === "completed") {
        api.patch("/reminder/" + rem_id, { status: "active" }).then(resp => {
          dispatch(getRems(jurn_id))
        })
      } else {
        api.patch("/reminder/" + rem_id, { status: "completed" }).then(resp => {
          dispatch(getRems(jurn_id))
        })
      }
    })
  }
}

//working on filter
function filterReminders(filter, jurn_id) {
  return dispatch => {
    let query = ""
    if (filter === "all") {
      query = ""
    } else if (filter === "completed") {
      query = "?status=completed"
    } else if (filter === "active") {
      query = "?status=active"
    }
    api.get(`/reminders/${query}/${jurn_id}`).then(resp => {
      dispatch({
        type: GET_REMS,
        payload: resp
      })
      dispatch(getRemsCount(jurn_id))
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

//working on clear reminders

function clearReminders(jurn_id) {
  return dispatch => {
    api.get(`reminders/${jurn_id}?status=completed`).then(resp => {
      Promise.all(
        resp.map(
          rem =>
            new Promise((resolve, reject) => {
              api.delete("/reminder/" + rem.id).then(resp => {
                resolve()
              })
            })
        )
      ).then(values => {
        dispatch(getRems(jurn_id))
      })
    })
  }
}

export function useRems() {
  const dispatch = useDispatch()
  const rems = useSelector(appState => appState.RemindersState.rems)
  const remsCount = useSelector(appState => appState.RemindersState.remsCount)
  const addRem = (item, jurn_id) => dispatch(addReminder(item, jurn_id))
  const delRem = (rem_id, jurn_id) => dispatch(deleteRem(rem_id, jurn_id))
  const toggleRem = (rem_id, jurn_id) =>
    dispatch(toggleReminder(rem_id, jurn_id))
  const filterRems = (filter, jurn_id) =>
    dispatch(filterReminders(filter, jurn_id))
  const clearRems = jurn_id => dispatch(clearReminders(jurn_id))
  const updateRems = jurn_id => dispatch(getRems(jurn_id))
  console.log(remsCount)
  return {
    rems,
    remsCount,
    addRem,
    delRem,
    toggleRem,
    filterRems,
    clearRems,
    updateRems
  }
}
