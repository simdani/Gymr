import React, {Component} from 'react';
import axios from 'axios';

import { API_ROOT } from '../../api-config';

import BackButton from '../utils/BackButton';

export default class ShowGym extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gym: ''
    };
  }

  componentDidMount() {
    this.getGymById(this.props.match.params.id);
  }

  getGymById = (gymId) => {
    axios.get(`${API_ROOT}/gyms/${gymId}`)
    .then(res => {
      if (res.data !== null) {
        const gym = res.data;
        this.setState({ gym });
      }
    })
  }

  renderGym() {
    if (this.state.gym !== '') {
      return (
        <div className="card">
        <h4 className="card-title">{this.state.gym.name}</h4>
        <div className="card-body">
          <p>{this.state.gym.city}</p>
        </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="starter-template container">
        <BackButton />
        {this.renderGym()}
      </div>
    )
  }
}