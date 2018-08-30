import React, {Component} from 'react';
import axios from 'axios';

import { API_ROOT } from '../../api-config';

import BackButton from '../common/BackButton';
import LoadingSpinner from '../common/LoadingSpinner';

export default class ShowGym extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gym: '',
      loading: false
    };
  }

  componentDidMount() {
    this.getGymById(this.props.match.params.id);
  }

  getGymById = (gymId) => {
    this.setState({
      loading: true
    }, () =>
      axios.get(`${API_ROOT}/gyms/${gymId}`)
      .then(res => {
        if (res.data !== null) {
          const gym = res.data;
          this.setState({ 
            gym,
            loading: false
          });
        }
      }));
  }

  renderGym() {
    if (this.state.gym !== '') {
      return (
        <div className="card text-center">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <BackButton />
          </li>
        </ul>
      </div>
        <div className="card">
        <h4 className="card-title">{this.state.gym.name}</h4>
        <div className="card-body">
          <p className="card-text">{this.state.gym.city}</p>
        </div>
        </div>
        </div>
      );
    }
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="starter-template container">
        {loading ? <LoadingSpinner/> : this.renderGym() } 
      </div>
    );
  }
}