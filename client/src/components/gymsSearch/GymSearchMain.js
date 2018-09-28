import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getGyms, searchGyms } from '../../actions/gymActions';

import LoadingSpinner from '../common/LoadingSpinner';

import GymsRender from '../gyms/GymsRender';

class GymSearchMain extends Component {
  componentDidMount() {
    this.props.getGyms(this.props.gym.current, this.props.gym.keyword);
  }

  handleChange = (event) => {
    this.props.searchGyms(1, event.target.value);
  }

  render() {
    const { gyms, loading } = this.props.gym;

    return (
      <div className="starter-template container">
        
        <div className="row">

          <div className="col-4">
            <h4>Search gyms</h4>
            <div className="card text-center">
                <div className="card-body">
                <input value={this.props.keyword} onChange={this.handleChange} type="text" className="form-control" placeholder="Enter city..." aria-label="Recipient's username" aria-describedby="basic-addon2"/>

              </div>
            </div>
          </div>
          <div className="col-8">
          
          <div className="d-flex">
            <div>
              <h5>Found Gyms:</h5>
            </div>
            <div className="ml-auto dropdown show">
              <a className="btn btn-secondary dropdown-toggle" href="" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sort By
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a className="dropdown-item" href="">Newest</a>
                <a className="dropdown-item" href="">Oldest</a>
                <a className="dropdown-item" href="">Rating</a>
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

const mapStateToProps = state => ({
  gym: state.gym,
  keyword: state.gym.keyword
});

export default connect(mapStateToProps, {getGyms, searchGyms})(GymSearchMain);