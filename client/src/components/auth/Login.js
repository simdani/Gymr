import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackButton from '../common/BackButton';
import { connect } from 'react-redux';
import { loginUser, loginGoogle } from '../../actions/authActions';
import { GoogleLogin } from 'react-google-login';

import { NotificationManager} from 'react-notifications';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
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
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  googleResponse = (response) => {
    const token = {
      access_token: response.accessToken
    };

    this.props.loginGoogle(token, () => {
      NotificationManager.success('Logged in with google', 'Success');
    });
  };

  onFailure = () => {
    NotificationManager.warning('Failed to log in with google', 'Error');
  };


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

            <GoogleLogin
                        clientId="203901133016-ac7ijvdt8ri6it94p8m534a51e6gnkpq.apps.googleusercontent.com"
                        buttonText="Google Login"
                        onSuccess={this.googleResponse}
                        onFailure={this.onFailure}
            />

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
              {this.state.errors.email && <div className="invalid-feedback d-block">{this.state.errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password"
                className="form-control"
                value={this.state.password}
                placeholder="Password"
                name="password"
                onChange={this.onChange}
              />
              {this.state.errors.password && <div className="invalid-feedback d-block">{this.state.errors.password}</div>}
            </div>

            <button type="submit" className="btn btn-light">
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
  loginGoogle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {loginUser, loginGoogle})(Login);
