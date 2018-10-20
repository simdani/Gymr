import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setToken from '../utils/setToken';
import { setCurrentUser, logoutUser } from '../state-management/actions/authActions';

import Gyms from './gyms/Gyms';
import Gym from './gym/Gym';
import GymForm from './gym/GymForm';
import GymSearchMain from './gymsSearch/GymSearchMain';
import Navbar from './layout/Nav';
import Login from './auth/Login';
import Register from './auth/Register';

import { Provider } from 'react-redux';
import store from '../store';

import './App.css';
import 'react-notifications/lib/notifications.css';

import {NotificationContainer} from 'react-notifications';
import { NotificationManager} from 'react-notifications';
import GymEditForm from './gym/GymEditForm';

if (localStorage.jwtToken) {
  // set auth token header auth
  setToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  // check if token is expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser(() => {
      NotificationManager.success('Logged out successfully!', 'Success');
      window.location.href = '/';
    }));
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
              <Route exact path='/gyms/:id/edit' component={GymEditForm} />
            </Switch>

           <NotificationContainer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
