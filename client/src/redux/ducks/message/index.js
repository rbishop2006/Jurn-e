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

function fetchMessages() {
  return (dispatch) => {
    api
      .get(`/messages`)
      .then((resp) => {
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

function createMessage(user_id, jurnId, message) {
  return new Promise((resolve, reject) => {
    api
      .post("/message", { user_id, jurnId, message })
      .then((resp) => {
        resolve(resp)
      })
      .catch((e) => {
        reject()
      })
  })
}

export function useMessages() {
  const dispatch = useDispatch()
  const messages = useSelector((appState) => appState.MessageState.msgs)
  const getMessages = () => dispatch(fetchMessages())
  const sendMessage = (user_id, jurnId, message) =>
    createMessage(user_id, jurnId, message)

  return { messages, getMessages, sendMessage }
}
