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
      <div>
        <ul>
          { this.state.gyms.map(gym => <li>{gym.name}</li>)}
        </ul>
      </div>
    )
  }
}