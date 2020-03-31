import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_ACTS = "activities/GET_ACTS"
const SET_ACTSCOUNT = "activities/SET_ACTSCOUNT"

const initialState = {
  acts: [],
  actsCount: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTS:
      return { ...state, acts: action.payload }
    case SET_ACTSCOUNT:
      return { ...state, actsCount: action.payload }

    default:
      return state
  }
}

function getActs(jurn_id) {
  return dispatch => {
    api.get("/activities/" + jurn_id).then(resp => {
      dispatch(getActsCount(jurn_id))
      dispatch({
        type: GET_ACTS,
        payload: resp
      })
    })
  }
}

function addActivity(activity, jurn_id) {
  return dispatch => {
    api.post("/addact", { activity, jurn_id }).then(resp => {
      dispatch(getActs(jurn_id))
    })
  }
}

function toggleActivity(act_id, jurn_id) {
  return dispatch => {
    api.get("/toggleact/" + act_id).then(resp => {
      console.log(resp)
      const status = resp.status
      const act_id = resp.act_id
      if (status === "completed") {
        api.patch("/activity", { act_id, status: "active" }).then(resp => {
          dispatch(getActs(jurn_id))
        })
      } else {
        api.patch("/activity", { act_id, status: "completed" }).then(resp => {
          dispatch(getActs(jurn_id))
        })
      }
    })
  }
}

function filterActivities(status, jurn_id) {
  return dispatch => {
    let query = ""
    if (status === "all") {
      query = ""
    } else if (status === "completed") {
      query = "?status=completed"
    } else if (status === "active") {
      query = "?status=active"
    }
    api.get(`/activities/${jurn_id}${query}`).then(resp => {
      dispatch({
        type: GET_ACTS,
        payload: resp
      })
      dispatch(getActsCount(jurn_id))
    })
  }
}

function getActsCount(jurn_id) {
  return dispatch => {
    api.get(`/activities/${jurn_id}?status=active`).then(resp => {
      dispatch({
        type: SET_ACTSCOUNT,
        payload: resp.length
      })
    })
  }
}

function clearActivities(jurn_id) {
  return dispatch => {
    api.get(`/activities/${jurn_id}?status=completed`).then(resp => {
      Promise.all(
        resp.map(
          act =>
            new Promise((resolve, reject) => {
              api.delete("/activity/" + act.act_id).then(resp => {
                resolve()
              })
            })
        )
      ).then(values => {
        dispatch(getActs(jurn_id))
      })
    })
  }
}

export function useActs() {
  const dispatch = useDispatch()
  const acts = useSelector(appState => appState.ActivitiesState.acts)
  const actsCount = useSelector(appState => appState.ActivitiesState.actsCount)
  const addAct = (activity, jurn_id) => dispatch(addActivity(activity, jurn_id))
  const toggleAct = (act_id, jurn_id) =>
    dispatch(toggleActivity(act_id, jurn_id))
  const filterActs = (status, jurn_id) =>
    dispatch(filterActivities(status, jurn_id))
  const clearActs = jurn_id => dispatch(clearActivities(jurn_id))
  const updateActs = jurn_id => dispatch(getActs(jurn_id))
  return {
    acts,
    actsCount,
    addAct,
    toggleAct,
    filterActs,
    clearActs,
    updateActs
  }
}
