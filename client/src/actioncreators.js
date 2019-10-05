export const GET_DATA = "GET_DATA";
export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const TOGGLE_EDIT_MODAL = "TOGGLE_EDIT_MODAL";
export const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS";

export function login() {
  return {
    type: GET_DATA,
  }
}

export function newNotification(message, typeOfNotification) {
  return {
    type: ADD_NOTIFICATION,
    notification: message,
    typeOfNotification
  }
}

