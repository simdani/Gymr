import React, {Component, Fragment} from 'react';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getGyms, searchGyms } from '../../state-management/actions/gymActions';

import LoadingSpinner from '../../components/common/LoadingSpinner';

import GymsRender from '../gyms/GymsRender';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class GymSearchMain extends Component {
  componentDidMount() {
    this.props.getGyms(this.props.gym.current, this.props.gym.keyword, this.props.gym.sort);
  }

  handleChange = (event) => {
    this.props.searchGyms(1, event.target.value, '');
  };

  getByOldest = () => {
    this.props.searchGyms(this.props.gym.current, this.props.gym.keyword, 'oldest');
  };

  getByNewest = () => {
    this.props.searchGyms(this.props.gym.current, this.props.gym.keyword, 'newest');
  };

  getByLikes = () => {
    this.props.searchGyms(this.props.gym.current, this.props.gym.keyword, 'likes');
  };

  render() {
    const { gyms, loading } = this.props.gym;

    return (
      <div className="starter-template container">

        <div className="row">

          <div className="col-4">
            <h4 className="mb-3"><FontAwesomeIcon icon={faSearch} /> Search gyms</h4>
            <div className="card text-center">
                <div className="card-body">
                <input value={this.props.keyword} onChange={this.handleChange} type="text" className="form-control" placeholder="Enter city..." aria-label="Recipient's username" aria-describedby="basic-addon2"/>

              </div>
            </div>
          </div>
          <div className="col-8">

          <div className="d-flex">
            <div>
              <h5>Found gyms in city: {this.props.keyword}</h5>
            </div>
            <div className="ml-auto dropdown show mb-2">
              <a href="/" className="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                { this.props.gym.sort? this.props.gym.sort : <Fragment>Sort by</Fragment> }
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <p onClick={this.getByNewest} className="dropdown-item">Newest</p>
                <p onClick={this.getByOldest} className="dropdown-item">Oldest</p>
                <p onClick={this.getByLikes} className="dropdown-item">Likes</p>
              </div>
            </div>
          </div>
            {gyms === null || loading ? <LoadingSpinner/> : <GymsRender /> }
          </div>

         </div>
      </div>
    );
  }
}

GymSearchMain.propTypes = {
  getGyms: PropTypes.func.isRequired,
  gym: PropTypes.object.isRequired,
  searchGyms: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired
};

const mapDispatchToProps = dispatch => ({
  getGyms: (page, keyword, sort) => {
    dispatch(getGyms(page, keyword, sort));
  },
  searchGyms: (page, keyword, sort) => {
    dispatch(searchGyms(page, keyword, sort));
  }
});

const mapStateToProps = state => ({
  gym: state.gym,
  keyword: state.gym.keyword
});

export default connect(mapStateToProps, mapDispatchToProps)(GymSearchMain);
