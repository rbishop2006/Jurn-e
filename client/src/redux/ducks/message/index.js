import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_MESSAGES = "chatroom/GET_MESSAGES"

const initialState = {
  msgs: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

function fetchMessages(user_id) {
  return (dispatch) => {
    api
      .get(`/messages/${user_id}`)
      .then((resp) => {
        console.log(resp)
        dispatch({
          type: GET_MESSAGES,
          payload: {
            msgs: resp.messages,
          },
        })
      })
      .catch()
  }
}

function createMessage(user_id, jurnId, message, timestamp) {
  return (dispatch) => {
    api.post("/message", { user_id, jurnId, message, timestamp }).catch()
  }
}

export function useMessages() {
  const dispatch = useDispatch()
  const messages = useSelector((appState) => appState.MessageState.msgs)
  const getMessages = (user_id) => dispatch(fetchMessages(user_id))
  const sendMessage = (user_id, jurnId, message, timestamp) =>
    dispatch(createMessage(user_id, jurnId, message, timestamp))

  return { messages, getMessages, sendMessage }
}
