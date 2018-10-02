import React, {Component} from 'react';

import { getGym, deleteGym } from '../../actions/gymActions';

import { Link } from 'react-router-dom';

import BackButton from '../common/BackButton';
import LoadingSpinner from '../common/LoadingSpinner';
import ReviewFeed from './ReviewFeed';
import ReviewForm from './ReviewForm';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NotificationManager} from 'react-notifications';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

class Gym extends Component {
  componentDidMount() {
    this.props.getGym(this.props.match.params.id);
  }

  // remove gym
  removeReview = (e, gymId) => {
    e.preventDefault();

    this.props.deleteGym(gymId, () => {
      NotificationManager.success('Gym deleted successfully!', 'Success');
      this.props.history.push('/');
    });
  }

  renderGym(gym) {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="card text-center">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs d-flex">
            <li className="nav-item">
              <BackButton />
            </li>
            {isAuthenticated ? 
            <li className="nav-item ml-auto">
              <Link to={`/gyms/${gym._id}/edit`}>
                <button className="btn btn-dark mb-2 mr-1">
                  <FontAwesomeIcon icon={faEdit} /> Edit gym
                </button>
              </Link>
              <button className="btn btn-danger mb-2" onClick={(e) => this.removeReview(e, gym._id)}>
              <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </li>
            : (null)
            }
          </ul>
        </div>
        <div className="card">
          <h4 className="card-title">{gym.name}</h4>
          <div className="card-body">
            <p className="card-text">{gym.city}</p>

            <div className="text-left">
              <h5>Details</h5>
              <p><strong>Description:</strong>{gym.description}</p>
              <p><strong>Website:</strong>{gym.website}</p>

              <hr/>

              <h5>User reviews</h5>
              {isAuthenticated ? <ReviewForm gymId={gym._id} /> : (null)}
              
              { gym.reviews.length !== 0 ?
              <ReviewFeed gymId={ gym._id } reviews={ gym.reviews} />
              : <p>There are no reviews yet.</p>
              }
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
  gym: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  gym: state.gym,
  auth: state.auth
});

export default connect(mapStateToProps, { getGym, deleteGym })(Gym);