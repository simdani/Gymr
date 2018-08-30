import { GET_GYMS, GYM_LOADING } from '../actions/types';

const initialState = {
  gyms: [],
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GYM_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_GYMS:
      return {
        ...state,
        gyms: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
