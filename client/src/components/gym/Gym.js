import React, {Component} from 'react';

import { getGym } from '../../actions/gymActions';

import BackButton from '../common/BackButton';
import LoadingSpinner from '../common/LoadingSpinner';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Gym extends Component {
  componentDidMount() {
    this.props.getGym(this.props.match.params.id);
  }

  renderGym(gym) {
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
          <h4 className="card-title">{gym.name}</h4>
          <div className="card-body">
            <p className="card-text">{gym.city}</p>

            <div className="text-left">
              <h5>Details</h5>
              <p><strong>Description:</strong></p>
              <p><strong>Website:</strong></p>

              <hr/>

              <h5>User reviews</h5>
              <p>Currently, there are no user reviews</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { gym, loading } = this.props.gym;

    return (
      <div className="starter-template container">
        {loading || gym === null || Object.keys(gym).length === 0 ? <LoadingSpinner/> : this.renderGym(gym) } 
      </div>
    );
  }
}

Gym.propTypes = {
  getGym: PropTypes.func.isRequired,
  gym: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  gym: state.gym
});

export default connect(mapStateToProps, { getGym })(Gym);