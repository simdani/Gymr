import axios from 'axios';

import { GET_GYMS, GET_GYM, GYM_SEARCH, ADD_GYM, GYM_LOADING, GET_ERRORS, DELETE_GYM, EDIT_GYM, CLEAR_ERRORS } from './types';
import { API_ROOT } from '../../utils/api-config';

export const getGym = gymId => dispatch => {
  dispatch(setGymLoading());
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

export const addGym = (postData, data, callback) => dispatch => {
  let image;
  if (data !== null) {
    axios.post(`${API_ROOT}/gyms/files`, data).then((response) => {
      image = response.data;
      postData.image = image;
      sendGym(dispatch, postData, callback);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  }
  else {
    sendGym(dispatch, postData, callback);
  }
};

function sendGym (dispatch, postData, callback) {
  return axios
    .post(`${API_ROOT}/gyms`, postData)
    .then(res =>
      dispatch({
          type: ADD_GYM,
          gym: {},
          gyms: [],
          loading: false,
          pages: null,
          current: 1,
          keyword: ''
        },
        dispatch(getGyms),
        callback())
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

export const editGym = (gymId, postData, callback) => dispatch => {
  axios
    .put(`${API_ROOT}/gyms/${gymId}`, postData)
    .then(res =>
      dispatch({
        type: EDIT_GYM,
        gym: {},
        gyms: [],
        loading: false,
        pages: null,
        current: 1,
        keyword: ''
      },
      dispatch(getGyms),
      callback())
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// delete gym
export const deleteGym = (gymId) => dispatch => {
  axios
    .delete(`${API_ROOT}/gyms/${gymId}`)
    .then(res =>
      dispatch({
        type: DELETE_GYM,
        payload: gymId
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getGyms = (current, keyword, sort) => dispatch => {
  dispatch(setGymLoading());
  getGymsFromApi(current, keyword, sort, dispatch);
};


export const searchGyms = (current, keyword, sort) => dispatch => {
  dispatch({
    type: GYM_SEARCH,
    payload: keyword
  }, dispatch(getGyms(current, keyword, sort)));
};

const getGymsFromApi = (current, keyword, sort, dispatch) => {
  let request;
  if (keyword !== '' && sort !== '') {
    request = `${API_ROOT}/gyms?search=${keyword}&page=${current}&sort=${sort}`;
  }
  else if (keyword !== '')
    request = `${API_ROOT}/gyms?search=${keyword}&page=${current}`;
  else if (sort !== '') {
    request = `${API_ROOT}/gyms?page=${current}&sort=${sort}`;
  }
  else
    request = `${API_ROOT}/gyms?page=${current}`;

  axios.get(request)
  .then(res => {
    dispatch({
      type: GET_GYMS,
      payload: res.data,
      current: current,
      sort: sort,
      totalPages: res.headers['total-pages']
    });
    }
  )
  .catch (err =>
    dispatch({
      type: GET_GYMS,
      payload: null
    })
  );
};

// add review
export const addReview = (gymId, review) => dispatch => {
  axios
    .post(`${API_ROOT}/gyms/${gymId}/reviews`, review)
    .then(res =>
      dispatch(getGym(gymId), dispatch({type: CLEAR_ERRORS}))
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// delete gym review
export const deleteReview = (gymId, reviewId) => dispatch => {
  axios
    .delete(`${API_ROOT}/gyms/${gymId}/reviews/${reviewId}`)
    .then(res =>
      dispatch(getGym(gymId))
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// udpate gym review
export const updateReview = (updateReview, gymId, reviewId, callback) => dispatch => {
  axios
    .put(`${API_ROOT}/gyms/${gymId}/reviews/${reviewId}`, updateReview)
    .then(res =>
      dispatch(getGym(gymId), dispatch({type: CLEAR_ERRORS}), callback())
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addLike = gymId => dispatch => {
  axios
    .post(`${API_ROOT}/gyms/${gymId}/like`)
    .then(res => dispatch({
      type: GET_GYM,
      payload: res.data
    }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
};

export const removeLike = gymId => dispatch => {
  axios
    .post(`${API_ROOT}/gyms/${gymId}/unlike`)
    .then(res => dispatch({
      type: GET_GYM,
      payload: res.data
    }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
};

// set gym loading
export const setGymLoading = () => {
  return {
    type: GYM_LOADING
  };
};
