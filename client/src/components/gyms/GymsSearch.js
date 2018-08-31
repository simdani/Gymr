import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { searchGyms } from '../../actions/gymActions';

class GymsSeach extends Component {
  handleChange = (event) => {
    this.props.searchGyms(event.target.value);
  }

  render() {
    return (
      <div className="input-group mb-3">
      <input value={this.props.keyword} onChange={this.handleChange} type="text" className="form-control" placeholder="Enter city..." aria-label="Recipient's username" aria-describedby="basic-addon2"/>
      </div>
    );
  }
}

GymsSeach.propTypes = {
  searchGyms: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  keyword: state.gym.keyword
});

export default connect(mapStateToProps, {searchGyms})(GymsSeach);