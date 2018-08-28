import React, {Component} from 'react';
import axios from 'axios';

import { API_ROOT } from '../../api-config';

export default class IndexComponent extends Component {
  state = {
    gyms: []
  }

  componentDidMount() {
    axios.get(`${API_ROOT}/gyms`)
      .then(res => {
        const gyms = res.data;
        this.setState({ gyms });
      })
  }

  render() {
    return (
      <div className="starter-template container">
        <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Enter city..." aria-label="Recipient's username" aria-describedby="basic-addon2"/>
        </div>
        <div className="row">
          { this.state.gyms.map(gym => 
          <div className="col-sm-4 mb-3">
            <div className="card">
              <h4 className="card-title">{gym.name}</h4>
              <p>{gym.city}</p>
            </div>
          </div>
          )}
        </div>
      </div>
    )
  }
}