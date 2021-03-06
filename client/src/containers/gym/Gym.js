import React, {Component} from 'react';

import { getGym, deleteGym, addLike, removeLike } from '../../state-management/actions/gymActions';

import { Link } from 'react-router-dom';

import BackButton from '../../components/common/BackButton';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ReviewFeed from './ReviewFeed';
import ReviewForm from './ReviewForm';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NotificationManager} from 'react-notifications';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

class Gym extends Component {
  componentDidMount() {
    this.props.getGym(this.props.match.params.id);
  }

  deleteGym = (e, gymId) => {
    e.preventDefault();

    // if (this.props.auth.user === 'ADMIN') {
    //   console.log('test');
      this.props.deleteGym(gymId);
    // }
  };

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    return likes.filter(like => like.user === auth.user.id).length > 0;
  }

  renderGym(gym) {
    const { isAuthenticated } = this.props.auth;

    console.log(this.props.auth);

    return (
      <div className="card text-center">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs d-flex">
            <li className="nav-item">
              <BackButton />
            </li>
            {isAuthenticated && this.props.auth.user.role === 'ADMIN' ?
            <li className="nav-item ml-auto">
              <Link to={`/gyms/${gym._id}/edit`}>
                <button className="btn btn-dark mb-2 mr-1">
                  <FontAwesomeIcon icon={faEdit} /> Edit gym
                </button>
              </Link>
              <button className="btn btn-danger mb-2" onClick={(e) => this.deleteGym(e, gym._id)}>
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

              { gym.image && <p><img src={gym.image} alt={gym.name} /></p> }

              <hr/>

              { isAuthenticated?

              (this.findUserLike(gym.likes)
              ?
                <span>
                  <button className="btn btn-light mr-1" disabled="true">
                    <FontAwesomeIcon className="text-secondary" icon={faThumbsUp} />
                    <span className="badge badge-light">{gym.likes.length}</span>
                  </button>
                  <button
                    onClick={this.onUnlikeClick.bind(this, gym._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                  <FontAwesomeIcon icon={faThumbsDown} />
                    <i className="text-secondary fas fa-thumbs-down" />
                  </button>
                </span>
                :
                <span>
                  <button
                  onClick={this.onLikeClick.bind(this, gym._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                <FontAwesomeIcon icon={faThumbsUp} />
                  <span className="badge badge-light">{gym.likes.length}</span>
                </button>
                <button className="btn btn-light mr-1" disabled="true">
                <FontAwesomeIcon className="text-secondary" icon={faThumbsDown} />
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                </span>
                )
              : <span className="badge badge-light mb-2"><FontAwesomeIcon icon={faThumbsUp} /> {gym.likes.length}</span> }


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

Gym.defaultProps = {
  showActions: true
};

Gym.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  getGym: PropTypes.func.isRequired,
  deleteGym: PropTypes.func.isRequired,
  gym: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  getGym: gymId => {
    dispatch(getGym(gymId));
  },
  deleteGym: (gymId) => {
    dispatch(deleteGym(gymId));
  },
  addLike: id => {
    dispatch(addLike(id));
  },
  removeLike: id => {
    dispatch(removeLike(id));
  }
});

const mapStateToProps = state => ({
  gym: state.gym,
  auth: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(Gym);
