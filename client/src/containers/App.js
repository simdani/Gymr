import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Gyms from '../components/gyms/Gyms';
import Gym from '../components/gym/Gym';
import GymForm from '../components/gym/GymForm';

import Navbar from '../components/layout/navbar';

import { Provider } from 'react-redux';
import store from '../store';

import './App.css';
import 'react-notifications/lib/notifications.css';

import {NotificationContainer} from 'react-notifications';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar/>
            <Switch>
              <Route exact path='/' component={Gyms}/>
              <Route path='/gyms/add' component={GymForm}/>
              <Route path='/gyms/:id' component={Gym}/>
            </Switch>

           <NotificationContainer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
