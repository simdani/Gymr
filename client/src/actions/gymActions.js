import axios from 'axios';

import { GET_GYMS, GET_GYM, GYM_LOADING } from './types';
import { API_ROOT } from '../utils/api-config';

export const getGym = gymId => dispatch => {
  axios.get(`${API_ROOT}/gyms/${gymId}`)
  .then(res => 
    dispatch({
      type: GET_GYM,
      payload: res.data
    })
  )
  .catch(err => 
    dispatch({
      type: GET_GYM,
      payload: null
    })
  );
};

export const getGyms = () => dispatch => {
  dispatch(setGymLoading());
  getGymsFromApi('', dispatch);
};

export const getGymsByKeyword = keyword => dispatch => {
  dispatch(setGymLoading());
  getGymsFromApi(keyword, dispatch);
};

const getGymsFromApi = (keyword, dispatch) => {
  let request;
  if (keyword !== '') 
    request = `${API_ROOT}/gyms?search=${keyword}`;
  else
    request = `${API_ROOT}/gyms`;
  

  axios.get(request)
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
