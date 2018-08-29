import React, {Component} from 'react';
import AllGyms from './AllGyms';
import ShowGym from './ShowGym';
import { Switch, Route } from 'react-router-dom';

export default class IndexComponent extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={AllGyms}/>
        <Route path='/gyms/:id' component={ShowGym}/>
      </Switch>
    )
  }
}