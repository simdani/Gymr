import { GET_GYMS, GET_GYM, GYM_SEARCH, GYM_LOADING } from '../actions/types';

const initialState = {
  gym: {},
  gyms: [],
  loading: false,
  pages: null,
  current: 1,
  keyword: ''
};

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
        gyms: action.payload.gyms,
        pages: action.payload.pages,
        current: action.payload.current,
        loading: false
      };
    case GET_GYM:
      return {
        ...state,
        gym: action.payload,
        loading: false
      };
    case GYM_SEARCH:
      return {
        ...state,
        keyword: action.payload
      };
    default:
      return state;
  }
}
