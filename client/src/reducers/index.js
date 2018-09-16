import { combineReducers } from 'redux';
import gymReducer from './gymReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  gym: gymReducer,
  errors: errorReducer
});
