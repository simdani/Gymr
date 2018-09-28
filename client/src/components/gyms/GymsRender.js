import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getGyms } from '../../actions/gymActions';

class GymsRender extends Component {
  changePage = (pageNumber) => {
    const { keyword } = this.props.gym;
    this.props.getGyms(Number(pageNumber), keyword);
  }

  render() {
    const { gyms, current } = this.props.gym;

    return (
      <div>
      <div className="row">
        { gyms.map(gym => 
        <div key={gym._id} className="col-12">
          <div className="card">
            <h4 className="card-title">
            <Link to={`/gyms/${gym._id}`}>{gym.name}</Link>
                         
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
        onChange={this.changePage}
        itemClass="page-item"
        linkClass="page-link"
      />

    </div>
    );
  }
}

GymsRender.propTypes = {
  getGyms: PropTypes.func.isRequired,
  gym: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  gym: state.gym
});

export default connect(mapStateToProps, {getGyms})(GymsRender);