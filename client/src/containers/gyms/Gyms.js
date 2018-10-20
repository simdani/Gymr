import React, {Component} from 'react';

import { Link } from 'react-router-dom';

import LoadingSpinner from '../../components/common/LoadingSpinner';
import GymsSearch from './GymsSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';


import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getGyms } from '../../state-management/actions/gymActions';

import Pagination from 'react-js-pagination';

class AllGyms extends Component {
  componentDidMount() {
    this.props.getGyms(this.props.gym.current, this.props.gym.keyword, '');
  }

  handleClick = (pageNumber) => {
    const { keyword } = this.props.gym;
    this.props.getGyms(Number(pageNumber), keyword, '');
  };

  renderGyms(gyms, current) {
    return (
      <div>
        <div className="row">
          { gyms.map(gym =>
          <div key={gym._id} className="col-sm-4 mb-3 grow">
            <div className="card">
              <h4 className="card-title">
              <Link to={`/gyms/${gym._id}`}>{gym.name}</Link> <FontAwesomeIcon icon={faDumbbell} />

              </h4>
              <p>{gym.city}</p>
            </div>
          </div>
          )}
        </div>

      <Pagination
          activePage={current}
          itemsCountPerPage={10}
          totalItemsCount={this.props.gym.pages * 10}
          pageRangeDisplayed={5}
          onChange={this.handleClick}
          itemClass="page-item"
          linkClass="page-link"
        />

      </div>
    );
  }

  render() {
    const { gyms, loading, current } = this.props.gym;

    return (

      <div className="starter-template container">
      <div className="col-md-5 p-lg-2 mx-auto my-auto">
        <h1 className="display-4 font-weight-normal mb-3"><span className="orangeText">Find</span> and <span className="orangeText">review</span> gyms in your city!</h1>
        <Link to="/gyms/search" className="btn btn-secondary mb-3"><FontAwesomeIcon icon={faSearch} /> Search Gyms</Link>
      </div>

        <GymsSearch />

        {gyms === null || loading ? <LoadingSpinner/> : this.renderGyms(gyms, current) }
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