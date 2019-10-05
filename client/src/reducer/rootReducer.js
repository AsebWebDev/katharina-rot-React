import { GET_DATA, ADD_NOTIFICATION, TOGGLE_EDIT_MODAL, CLEAR_NOTIFICATIONS } from '../actioncreators';

const initialState = {
  collections: [],
  notifications: [],
  modal: {
    isOpen: false,
    isEdit: false,
    currentID: ''
  }
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
        notifications: [...state.notifications, {
          notification: action.notification,
          typeOfNotification: action.typeOfNotification
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
      console.log("Current ID: "+action.modal.currentId)
      return {
        ...newState,
        modal: action.modal
      }
    }
    
    default: return state;
  }
}