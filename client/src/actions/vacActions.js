import axios from 'axios';
import {
    GET_VACS,
    ADD_VAC,
    DELETE_VAC,
    VACS_LOADING
  } from '../actions/types';

  export const getVacs = () => dispatch => {
    dispatch(setVacsLoading());
    axios
      .get('/api/vacs')
      .then(res =>
        dispatch({
          type: GET_VACS,
          payload: res.data
        })
      )
      
  };
  
  export const deleteVac = id => dispatch => {
    axios
    .delete(`/api/vacs/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_VAC,
        payload: id
      })
    )
  }

  export const addVac = vac => dispatch => {
    axios
      .post('/api/vacs', vac)
      .then(res =>
        dispatch({
          type: ADD_VAC,
          payload: res.data
        })
      )
      
  };

  export const setVacsLoading = () => {
    return {
      type: VACS_LOADING
    }
}