import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_INVITED = "inviteUsers/GET_INVITED"

const initialState = {
  pending: [],
  accepted: [],
  declined: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INVITED:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

function getInvited(jurn_id) {
  return dispatch => {
    api
      .get("/invited/" + jurn_id)
      .then(resp => {
        dispatch({
          type: GET_INVITED,
          payload: {
            pending: resp.invited.pending,
            accepted: resp.invited.accepted,
            declined: resp.invited.declined
          }
        })
      })
      .catch()
  }
}

function createInvite(firstName, lastName, jurn_id) {
  return new Promise((resolve, reject) => {
    api
      .post("/invite", { firstName, lastName, jurn_id })
      .then(resp => {
        resolve(resp)
      })
      .catch(e => {
        reject()
      })
  })
}

export function useInvited() {
  const dispatch = useDispatch()
  const updateInvited = jurn_id => dispatch(getInvited(jurn_id))
  const pending = useSelector(appState => appState.InviteState.pending)
  const accepted = useSelector(appState => appState.InviteState.accepted)
  const declined = useSelector(appState => appState.InviteState.declined)
  const sendInvite = (firstName, lastName, jurn_id) =>
    createInvite(firstName, lastName, jurn_id)

  return {
    pending,
    accepted,
    declined,
    updateInvited,
    sendInvite
  }
}
