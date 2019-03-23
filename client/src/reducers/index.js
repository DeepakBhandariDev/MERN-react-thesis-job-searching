import { combineReducers } from 'redux';
import vacReducer from './vacReducer';


export default combineReducers({
    vac: vacReducer
  });
  