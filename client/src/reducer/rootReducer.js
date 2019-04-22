import { LOGIN, LOGOUT } from '../actioncreators';

const initialState = {
  count: 0
}

export default function rootReducer(state=initialState, action) {
  switch(action.type) {
    case LOGIN: {
      console.log("Login hit")
      return state;
    }
    case LOGOUT: {
      console.log("Logout hit");
      return state;
    } 
    default: return state;
  }
}