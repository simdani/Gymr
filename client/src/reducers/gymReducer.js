import { GET_GYMS, GET_GYM, GYM_SEARCH, ADD_GYM, GYM_LOADING, DELETE_GYM, EDIT_GYM } from '../actions/types';

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
        gyms: action.payload,
        pages: action.totalPages,
        current: action.current,
        loading: false
      };
    case GET_GYM:
      return {
        ...state,
        gym: action.payload,
        loading: false
      };
    case ADD_GYM:
      return {
        ...state,
        gym: action.gym,
        gyms: action.gyms,
        loading: action.loading,
        pages: action.pages,
        current: action.current,
        keyword: action.keyword
      };
    case EDIT_GYM:
      return {
        ...state,
        gym: action.gym,
        gyms: action.gyms,
        loading: action.loading,
        pages: action.pages,
        current: action.current,
        keyword: action.keyword
      };
    case DELETE_GYM:
      return {
        ...state,
        gyms: state.gyms.filter(gym => gym._id !== action.payload)
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
