import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackButton from '../common/BackButton';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

import { NotificationManager} from 'react-notifications';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData, () => {
      NotificationManager.success('Logged in successfully!', 'Success');
    });
  }

  render() {
    return (
      <div className="starter-template container">
        <div className="card text-center">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <BackButton />
              </li>
            </ul>
          </div>
          <div className="card">
            <h5 className="card-title">Login</h5>
            <div className="card-body">

            <form onSubmit={this.onSubmit}>
            <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email"
              className="form-control"
              value={this.state.email}
              placeholder="Email"
              name="email"
              onChange={this.onChange}
            />

            <label htmlFor="password">Password</label>
            <input type="password"
              className="form-control"
              value={this.state.password}
              placeholder="Password"
              name="password"
              onChange={this.onChange}
            />
            </div>

            <button type="submit" className="btn btn-secondary">
              Login
            </button>
            </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {loginUser})(Login);
