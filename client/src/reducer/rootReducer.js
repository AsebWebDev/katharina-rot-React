import { GET_DATA } from '../actioncreators';

const initialState = {
  arts: []
}

export default function rootReducer(state=initialState, action) {
  let newState = { ...state }
  switch(action.type) {
    case GET_DATA: {
      return {
        ...newState,
        arts: action.arts
        // arts: [...newState.arts, action.arts]
      };
    }
    
    default: return state;
  }
}