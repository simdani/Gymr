import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import IndexComponent from './components/gyms/IndexComponent';
import Navbar from './components/layout/navbar';

import { Provider } from 'react-redux';
import store from './store';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar/>
            <Switch>
              <Route path='/' component={IndexComponent} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
