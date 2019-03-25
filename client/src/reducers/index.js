import { combineReducers } from 'redux';
import vacReducer from './vacReducer.js';
import errorReducer from './errorReducer.js';
import authReducer from './authReducer.js';


export default combineReducers({
    vac: vacReducer,
    error: errorReducer,
    auth: authReducer
  });
  