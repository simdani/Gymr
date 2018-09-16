import axios from 'axios';

const setToken = token => {
  if (token) {
    // apply token to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setToken;
