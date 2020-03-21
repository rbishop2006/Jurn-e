import socket from "../../../socket"
// import { dispatch } from "../../store"
import { addMessage } from "./actions"
import store from "../../store"

export default () => {
  const dispatch = store.dispatch

  socket.on("new message", msg => dispatch(addMessage(msg)))
}
