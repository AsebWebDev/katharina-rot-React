import { GET_DATA, ADD_NOTIFICATION } from '../actioncreators';

const initialState = {
  collections: [],
  notifications: []
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
        notifications: [...state.notifications, action.notification]
      }
    }
    
    default: return state;
  }
}