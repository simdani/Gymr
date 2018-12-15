import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getGyms } from '../../state-management/actions/gymActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';

class GymsRender extends Component {
  render() {
    const { gyms } = this.props.gym;
    const { col } = this.props;

    return (
      <div>
      <div className="row">
        { gyms.map(gym =>
        <div key={gym._id} className={'col-' + col}>
          <div className="card mb-3 grow">
            <h4 className="card-title">
            <Link to={`/gyms/${gym._id}`}>{gym.name}</Link>
            </h4>

            <p className="card-text">{gym.city}</p>

            <div className="card-footer box">
              <span>
                <ul>
                  <li className="mr-2"><FontAwesomeIcon icon={faThumbsUp} />{gym.likes.length} </li>
                  <li><FontAwesomeIcon icon={faComment}/>{gym.reviews.length}</li>
                </ul>
              </span>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
    );
  }
}

GymsRender.propTypes = {
  getGyms: PropTypes.func.isRequired,
  gym: PropTypes.object.isRequired,
  col: PropTypes.string.isRequired
};

const mapDispatchToProps = dispatch => ({
  getGyms: (page, keyword, sort) => {
    dispatch(getGyms(page, keyword, sort));
  }
});

const mapStateToProps = state => ({
  gym: state.gym
});

export default connect(mapStateToProps, mapDispatchToProps)(GymsRender);
