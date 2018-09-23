import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getGyms } from '../../actions/gymActions';

import { Link } from 'react-router-dom';

import LoadingSpinner from '../common/LoadingSpinner';

class GymSearchMain extends Component {
  componentDidMount() {
    this.props.getGyms(this.props.gym.current, this.props.gym.keyword);
  }

  renderGyms(gyms, current) {
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

      </div>
    );
  }

  render() {
    const { gyms, loading, current } = this.props.gym;

    return (
      <div className="starter-template container">
        
        <div className="row">

          <div className="col-4">
            <h4>Search gyms</h4>
            <div className="card text-center">
                <div className="card-body">

                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                <label htmlFor="name">Gym name:</label>
                <input type="text"
                  className="form-control"
                  placeholder="enter gym name"
                  name="name"
                  onChange={this.onChange}
                />

                <label htmlFor="city">City:</label>
                <input type="text"
                  className="form-control"
                  placeholder="enter city"
                  name="city"
                  onChange={this.onChange}
                />
                </div>

                <button type="submit" className="btn btn-secondary">
                  Search
                </button>
                </form>
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
            {gyms === null || loading ? <LoadingSpinner/> : this.renderGyms(gyms, current) } 
          </div>

         </div>
      </div>
    );
  }
}

GymSearchMain.propTypes = {
  getGyms: PropTypes.func.isRequired,
  gym: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  gym: state.gym
});

export default connect(mapStateToProps, {getGyms})(GymSearchMain);