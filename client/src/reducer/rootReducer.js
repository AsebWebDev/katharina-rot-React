import { GET_DATA } from '../actioncreators';

const initialState = {
  collections: []
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
    
    default: return state;
  }
}