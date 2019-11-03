export const GET_DATA = "GET_DATA";
export const GET_NEWS = "GET_NEWS";
export const UPDATE_QUERY = "UPDATE_QUERY";
export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const TOGGLE_EDIT_MODAL = "TOGGLE_EDIT_MODAL";
export const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS";
export const PREPAREDELETE_NOTIFICATION = "PREPAREDELETE_NOTIFICATION";
export const UPDATE_NOTIFICATIONS = "UPDATE_NOTIFICATIONS";
export const SET_PIC_UPLOADS = "SET_PIC_UPLOADS";


export function newNotification(message, typeOfNotification) {
  return {
    type: ADD_NOTIFICATION,
    notification: message,
    typeOfNotification
  }
}

export function updateQuery(query) {
  return {
    type: UPDATE_QUERY,
    query
  }
}

export function setUploadedPics(uploadedPictures, uploadedTitlePic) {
  return {
    type: SET_PIC_UPLOADS,
    uploadedPictures,
    uploadedTitlePic
  }
}

export function toggleModal(modal, currentId, currentIndex) { 
  return {
    type: TOGGLE_EDIT_MODAL,
    modal: {
      isOpen: !modal.isOpen,
      currentId: (modal.isOpen) ? '' : currentId,// If modal is about to close, remove currentId
      currentIndex: (modal.isOpen) ? '' : currentIndex // If modal is about to close, remove currentId
    }
  }
}

