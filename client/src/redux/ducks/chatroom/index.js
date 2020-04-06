import { useSelector, useDispatch } from "react-redux"
import { api } from "react-auth"

const GET_CHATROOM = "chatroom/GET_CHATROOM"

const initialState = {
  chatroom: "",
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATROOM:
      return { chatroom: action.payload }
    default:
      return state
  }
}

function getChatRoom() {
  return (dispatch) => {
    api
      .get("/Jurne")
      .then((resp) => {
        dispatch({
          type: GET_CHATROOM,
          payload: resp.data.chatroom,
        })
      })
      .catch()
  }
}

export function useChatRoom() {
  const dispatch = useDispatch()
  const chatroom = useSelector((appState) => appState.chatRoomState.chatroom)
  const get = () => dispatch(getChatRoom())

  return { chatroom, get }
}
