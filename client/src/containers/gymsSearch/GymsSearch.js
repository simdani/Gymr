import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { searchGyms } from '../../state-management/actions/gymActions';

class GymsSeach extends Component {
  handleChange = (event) => {
    this.props.searchGyms(1, event.target.value, '');
  };

  render() {
    return (
      <div className="input-group mb-3">
      <input value={this.props.keyword} onChange={this.handleChange} type="text" className="form-control" placeholder="Enter city..." />
      </div>
    );
  }
}

GymsSeach.propTypes = {
  searchGyms: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired
};

const mapDispatchToProps = dispatch => ({
  searchGyms: (page, keyword, sort) => {
    dispatch(searchGyms(page, keyword, sort));
  }
});

const mapStateToProps = state => ({
  keyword: state.gym.keyword
});

export default connect(mapStateToProps, mapDispatchToProps)(GymsSeach);
