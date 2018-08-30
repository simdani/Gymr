import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Gyms from '../components/gyms/Gyms';
import Gym from '../components/gym/Gym';

import Navbar from '../components/layout/navbar';

import { Provider } from 'react-redux';
import store from '../store';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar/>
            <Switch>
              <Route exact path='/' component={Gyms}/>
              <Route path='/gyms/:id' component={Gym}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
