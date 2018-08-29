import React, {Component} from 'react';
import axios from 'axios';

import { API_ROOT } from '../../api-config';
import { Link } from 'react-router-dom';

import LoadingSpinner from '../utils/LoadingSpinner';
import SearchGymComponent from './searchGymCompoent';

export default class AllGyms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gyms: [],
      loading: false
    };

    this.getData = this.getData.bind(this);
  }

  getData = (keyword) => {
    if (keyword !== '') {
      this.getGymByKeyword(keyword);
    } else {
      this.getAllGyms();
    }
  }

  getGymByKeyword = (keyword) => {
    this.setState({
      loading: true
    }, () =>
      axios.get(`${API_ROOT}/gyms?search=${keyword}`)
      .then(res => {
        if (res.data !== null) {
          const gyms = res.data;
          this.setState({ 
            gyms,
            loading: false
          });
        }
      }));
  }

  renderGyms() {
    return (
        <div className="row">
          { this.state.gyms.map(gym => 
          <div key={gym._id} className="col-sm-4 mb-3">
            <div className="card">
              <h4 className="card-title">
              <Link to={`/gyms/${gym._id}`}>{gym.name}</Link>
                           
              </h4>
              <p>{gym.city}</p>
            </div>
          </div>
          )}
        </div>
    )
  }

  componentDidMount() {
    this.getAllGyms();
  }

  getAllGyms() {
    this.setState({
      loading: true
    }, () =>
      axios.get(`${API_ROOT}/gyms`)
      .then(res => {
        const gyms = res.data;
        this.setState({ 
          gyms,
          loading: false
        });
      }));
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="starter-template container">
        <SearchGymComponent sendKeyword={this.getData}/>
        {loading ? <LoadingSpinner/> : this.renderGyms() } 
      </div>
    )
  }
}