import axios from 'axios';

import { GET_GYMS, GYM_LOADING } from './types';
import {API_ROOT} from '../api-config';

export const getGyms = () => dispatch => {
  dispatch(setGymLoading());
  axios.get(`${API_ROOT}/gyms`)
    .then(res => 
      dispatch({
        type: GET_GYMS,
        payload: res.data
      })
    )
    .catch (err => 
      dispatch({
        type: GET_GYMS,
        payload: null
      })
    );
};

export const getGymsByKeyword = (keyword) => dispatch => {
  dispatch(setGymLoading());
  axios.get(`${API_ROOT}/gyms?search=${keyword}`)
    .then(res => 
      dispatch({
        type: GET_GYMS,
        payload: res.data
      })
    )
    .catch (err => 
      dispatch({
        type: GET_GYMS,
        payload: null
      })
    );
};

// set gym loading
export const setGymLoading = () => {
  return {
    type: GYM_LOADING
  };
};
