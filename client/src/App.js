import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import IndexComponent from './components/gyms/IndexComponent';
import Navbar from './components/layout/navbar';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar/>
          <Switch>
            <Route path='/' component={IndexComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
