export const GET_DATA = "GET_DATA";
export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const TOGGLE_EDIT_MODAL = "TOGGLE_EDIT_MODAL";
export const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS";
export const SET_PIC_UPLOADS = "SET_PIC_UPLOADS";

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

export function setUploadedPics(uploadedPictures, uploadedTitlePic) {
  return {
    type: SET_PIC_UPLOADS,
    uploadedPictures,
    uploadedTitlePic
  }
}

export function toggleModal(modal, currentId) {
  return {
    type: TOGGLE_EDIT_MODAL,
    modal: {
      isOpen: !modal.isOpen,
      isEdit: !modal.isEdit,
      currentId: (modal.isOpen) ? '' : currentId // If modal is about to close, remove currentId
    }
  }
}

