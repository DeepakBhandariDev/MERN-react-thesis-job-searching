
import {
    GET_VACS,
    ADD_VAC,
    DELETE_VAC,
    VACS_LOADING
  } from '../actions/types';
const initialState = {
    vacs: [],
    loading: false
}

  
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_VACS:
        return {
          ...state,
          vacs: action.payload,
          loading: false
        };
      case DELETE_VAC:
      return {
          ...state,
          vacs: state.vacs.filter(vacs => vacs._id !== action.payload)
      };
      case ADD_VAC:
      return {
          ...state,
          vacs: [action.payload, ...state.vacs ]
      };
      case VACS_LOADING:
      return {
        ...state,
        loading: true
      };
      default:
        return state;
    }
  }
  