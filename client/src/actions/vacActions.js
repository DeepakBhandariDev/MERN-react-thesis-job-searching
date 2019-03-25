import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
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
      ).catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
      
  };
  
  export const deleteVac = id => (dispatch, getState) => {
    axios
    .delete(`/api/vacs/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_VAC,
        payload: id
      })
    ).catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
  }

  export const addVac = vac =>(dispatch, getState) => {
    axios
      .post('/api/vacs', vac, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: ADD_VAC,
          payload: res.data
        })
      ).catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
      
  };

  export const setVacsLoading = () => {
    return {
      type: VACS_LOADING
    }
}