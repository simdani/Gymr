import axios from 'axios';
import setToken from '../utils/setToken';
import jwtDecode from 'jwt-decode';

import { SET_CURRENT_USER } from './types';
import { API_ROOT } from '../utils/api-config';

export const loginUser = (user, callback) => dispatch => {
  axios
    .post(`${API_ROOT}/users/login`, user)
    .then(res => {
      const { token } = res.data;
      // save token to local storage
      localStorage.setItem('jwtToken', token);
      // set token to auth header
      setToken(token);
      // decode token to get user data
      const decoded = jwtDecode(token);
      // set current user
      dispatch(setCurrentUser(decoded), callback());
    });
};

export const logoutUser = (callback) => dispatch => {
  // remove token
  localStorage.removeItem('jwtToken');
  // remove auth header
  setToken(false);
  // set current user to empty object
  dispatch(setCurrentUser({}), callback());
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};