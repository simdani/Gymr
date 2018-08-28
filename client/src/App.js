import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import IndexComponent from './components/gyms/IndexComponent';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path='/' component={IndexComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
