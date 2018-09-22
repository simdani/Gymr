import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

import { NotificationManager} from 'react-notifications';

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser(() => {
      NotificationManager.success('Logged out successfully!', 'Success');
    });
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const guestLinks = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to ="/users/register" className="nav-link">Register</Link>
        </li>
        <li className="nav-item">
          <Link to ="/users/login" className="nav-link">Login</Link>
        </li>
      </ul>
    );

    const authLinks = (
      <ul className="navbar-nav">
        <li className="nav-item">
        <a href="" className="nav-link">{user.email}</a>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.onLogoutClick} className="nav-link">Logout</a>
        </li>
      </ul>
    );

    return (
      <div>

        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <div className="container">
          <Link to="/" className="navbar-brand">Gyms</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to ="/gyms/search" className="nav-link">Gym Search</Link>
              </li>
              {isAuthenticated? 
              <li className="nav-item">
                <Link to ="/gyms/add" className="nav-link btn btn-primary">Add Gym</Link>
              </li>
              : (null) }
            </ul>
              {isAuthenticated ? authLinks : guestLinks}
          </div>
          </div>
        </nav>

      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(Navbar);