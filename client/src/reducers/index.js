import { combineReducers } from 'redux';
import gymReducer from './gymReducer';
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer,
  gym: gymReducer
});
