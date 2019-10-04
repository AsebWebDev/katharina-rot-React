export const GET_DATA = "GET_DATA";
export const ADD_NOTIFICATION = "ADD_NOTIFICATION";

export function login() {
  return {
    type: GET_DATA,
  }
}

export function newNotification(message) {
  console.log("Dispatch ActionCreator hit with : " + message)
  return {
    type: ADD_NOTIFICATION,
    notification: message
  }
}

