import { NEW_MESSAGE } from "./definitions"

export function addMessage(msg) {
  return {
    type: NEW_MESSAGE,
    payload: msg
  }
}
