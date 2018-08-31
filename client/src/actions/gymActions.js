import axios from 'axios';

import { GET_GYMS, GET_GYM, GYM_SEARCH, GYM_LOADING } from './types';
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

export const getGyms = (current, keyword) => dispatch => {
  dispatch(setGymLoading());
  getGymsFromApi(current, keyword, dispatch);
};


export const searchGyms = (current, keyword) => dispatch => {
  dispatch({
    type: GYM_SEARCH,
    payload: keyword
  }, dispatch(getGyms(current, keyword)));
};

const getGymsFromApi = (current, keyword, dispatch) => {
  let request;
  if (keyword !== '') 
    request = `${API_ROOT}/gyms?search=${keyword}&page=${current}`;
  else
    request = `${API_ROOT}/gyms?page=${current}`;
  
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
