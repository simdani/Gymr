import { combineReducers } from 'redux';
import gymReducer from './gymReducer';

export default combineReducers({
  gym: gymReducer
});
