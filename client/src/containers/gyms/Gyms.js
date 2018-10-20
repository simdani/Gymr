import React, {Component} from 'react';

import { Link } from 'react-router-dom';

import LoadingSpinner from '../../components/common/LoadingSpinner';
import GymsSearch from '../gymsSearch/GymsSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getGyms } from '../../state-management/actions/gymActions';

import GymsRender from './GymsRender';

class AllGyms extends Component {
  componentDidMount() {
    this.props.getGyms(this.props.gym.current, this.props.gym.keyword, '');
  }

  render() {
    const { gyms, loading } = this.props.gym;

    return (
      <div className="starter-template container">
      <div className="col-md-5 p-lg-2 mx-auto my-auto">
        <h1 className="display-4 font-weight-normal mb-3"><span className="orangeText">Find</span> and <span className="orangeText">review</span> gyms in your city!</h1>
        <Link to="/gyms/search" className="btn btn-secondary mb-3"><FontAwesomeIcon icon={faSearch} /> Search Gyms</Link>
      </div>

        <GymsSearch />

        {gyms === null || loading ? <LoadingSpinner/> : <GymsRender col="4"/>}
      </div>
    );
  }
}

AllGyms.propTypes = {
  getGyms: PropTypes.func.isRequired,
  gym: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  getGyms: (page, keyword, sort) => {
    dispatch(getGyms(page, keyword, sort));
  }
});

const mapStateToProps = state => ({
  gym: state.gym
});

export default connect(mapStateToProps, mapDispatchToProps)(AllGyms);
