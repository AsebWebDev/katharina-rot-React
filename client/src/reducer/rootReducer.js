import { GET_DATA, UPDATE_QUERY, ADD_NOTIFICATION, TOGGLE_EDIT_MODAL, CLEAR_NOTIFICATIONS, SET_PIC_UPLOADS, PREPAREDELETE_NOTIFICATION, UPDATE_NOTIFICATIONS } from '../actioncreators';

const initialState = {
  collections: [],
  notifications: [],
  modal: {
    isOpen: false,
    currentId: '',
    currentIndex: null
  },
  uploadedPictures: null,
  uploadedTitlePic: null,
  query: ''
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

    case UPDATE_QUERY: {
      return {
        ...newState,
        query: action.query
      };
    }

    case ADD_NOTIFICATION: {
      return {
        ...newState,
        notifications: [...state.notifications, {
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

    case UPDATE_NOTIFICATIONS: {
      let cleanedNotifications = newState.notifications.filter(item => item.created !== action.timestamp)
      return {
        ...newState,
        notifications: cleanedNotifications
      }
    }

    case PREPAREDELETE_NOTIFICATION: {
      let indexOfTarget = newState.notifications.findIndex(elem => elem.created === action.timestamp); // find Index of Notification by Timestamp
      newState.notifications[indexOfTarget].toBeDeleted = true;
      console.log(newState.notifications[indexOfTarget].notification + " is marked to be deleted.")
      return newState
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