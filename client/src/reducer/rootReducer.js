import { GET_DATA, ADD_NOTIFICATION, TOGGLE_EDIT_MODAL, CLEAR_NOTIFICATIONS, SET_PIC_UPLOADS } from '../actioncreators';

const initialState = {
  collections: [],
  notifications: [],
  modal: {
    isOpen: false,
    isEdit: false,
    currentId: ''
  },
  uploadedPictures: null,
  uploadedTitlePic: null
}

export default function rootReducer(state=initialState, action) {
  let newState = { ...state }
  switch(action.type) {
    case GET_DATA: {
      return {
        ...newState,
        collections: action.collections
      };
    }

    case ADD_NOTIFICATION: {
      return {
        ...newState,
        notifications: [...state.notifications.slice(state.notifications.length-3, state.notifications.length), {
          notification: action.notification,
          typeOfNotification: action.typeOfNotification,
          created: new Date()
        }]
      }
    }

    case CLEAR_NOTIFICATIONS: {
      return {
        ...newState,
        notifications: []
      }
    }

    case TOGGLE_EDIT_MODAL: {
      return {
        ...newState,
        modal: action.modal
      }
    }

    case SET_PIC_UPLOADS: {
      return {
        ...newState,
        uploadedPictures: action.uploadedPictures,
        uploadedTitlePic: action.uploadedTitlePic
      }
    }
    
    default: return state;
  }
}