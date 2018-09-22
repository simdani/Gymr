import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setToken from '../utils/setToken';
import { setCurrentUser, logoutUser } from '../actions/authActions';

import Gyms from '../components/gyms/Gyms';
import Gym from '../components/gym/Gym';
import GymForm from '../components/gym/GymForm';
import GymSearchMain from '../components/gymsSearch/GymSearchMain';
import Navbar from '../components/layout/Nav';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

import { Provider } from 'react-redux';
import store from '../store';

import './App.css';
import 'react-notifications/lib/notifications.css';

import {NotificationContainer} from 'react-notifications';

if (localStorage.jwtToken) {
  // set auth token header auth
  setToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  // check if token is expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar/>
            <Switch>
              <Route exact path='/' component={Gyms}/>
              <Route exact path="/users/login" component={Login} />
              <Route exact path="/users/register" component={Register} />
              <Route exact path='/gyms/add' component={GymForm}/>
              <Route exact path='/gyms/search' component={GymSearchMain} />
              <Route exact path='/gyms/:id' component={Gym}/>
            </Switch>

           <NotificationContainer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
