import socket from "../../../socket"
import { useSelector } from "react-redux"
import init from "./socket"

init()

export function useChat() {
  const add = msg => socket.emit("new message", msg)
  const messages = useSelector(appState => appState.chatState.messages)

  return { add, messages }
}
