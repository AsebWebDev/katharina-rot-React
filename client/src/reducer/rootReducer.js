import { 
  GET_DATA, 
  GET_NEWS,
  UPDATE_QUERY, 
  ADD_NOTIFICATION, 
  TOGGLE_EDIT_MODAL, 
  CLEAR_NOTIFICATIONS, 
  SET_PIC_UPLOADS, 
  PREPAREDELETE_NOTIFICATION, 
  UPDATE_NOTIFICATIONS,
  UPDATE_USER_SETTINGS,
  UPDATE_USER_DATA
} from '../actioncreators';

const initialState = {
  collections: [],
  notifications: [],
  news: [],
  modal: {
    isOpen: false,
    currentId: '',
    currentIndex: null
  },
  uploadedPictures: null,
  uploadedTitlePic: null,
  query: '',
  userSettings: null,
  username: null,
  profilePic: '' 
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

    case GET_NEWS: {
      return {
        ...newState,
        news: action.news
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

    case UPDATE_USER_SETTINGS: {
      return {
        ...newState,
        userSettings: action.settings
      }
    }

    case UPDATE_USER_DATA: {
      return {
        ...newState,
        username: action.userdata.username,
        profilePic: action.userdata.profilePic
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