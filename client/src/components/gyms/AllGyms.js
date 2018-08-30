import React, {Component} from 'react';

import { Link } from 'react-router-dom';

import LoadingSpinner from '../common/LoadingSpinner';
import SearchGymComponent from './searchGymCompoent';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getGyms, getGymsByKeyword } from '../../actions/gymActions';

class AllGyms extends Component {
  componentDidMount() {
    this.props.getGyms();
  }

  getData = (keyword) => {
    if (keyword !== '')
      this.props.getGymsByKeyword(keyword);
    else
      this.props.getGyms();
  }

  renderGyms(gyms) {
    return (
        <div className="row">
          { gyms.map(gym => 
          <div key={gym._id} className="col-sm-4 mb-3 grow">
            <div className="card">
              <h4 className="card-title">
              <Link to={`/gyms/${gym._id}`}>{gym.name}</Link>
                           
              </h4>
              <p>{gym.city}</p>
            </div>
          </div>
          )}
        </div>
    );
  }

  render() {
    const { gyms, loading } = this.props.gym;

    return (
      <div className="starter-template container">
        <SearchGymComponent sendKeyword={this.getData.bind(this)}/>
        
        {gyms === null || loading ? <LoadingSpinner/> : this.renderGyms(gyms) } 
      </div>
    );
  }
}

AllGyms.propTypes = {
  getGyms: PropTypes.func.isRequired,
  getGymsByKeyword: PropTypes.func.isRequired,
  gym: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  gym: state.gym
});

export default connect(mapStateToProps, {getGyms, getGymsByKeyword})(AllGyms);