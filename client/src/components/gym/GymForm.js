import React, {Component} from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BackButton from '../common/BackButton';
import { addGym } from '../../actions/gymActions';

import { NotificationManager} from 'react-notifications';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';


class GymForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      city: '',
      completed: false,
      errors: {}
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    
    const newGym = {
      name: this.state.name,
      city: this.state.city
    };

    this.props.addGym(newGym, () => {
      this.props.history.push('/');
      NotificationManager.success('Gym created successfully!', 'Success');
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
            <h5 className="card-title">Add new gym</h5>
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
              {this.state.errors.name && <div className="invalid-feedback d-block">{this.state.errors.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input type="text"
                className="form-control"
                placeholder="enter city"
                name="city"
                onChange={this.onChange}
              />
              {this.state.errors.city && <div className="invalid-feedback d-block">{this.state.errors.city}</div>}
            </div>

            <button type="submit" className="btn btn-light">
            <FontAwesomeIcon icon={faPencilAlt} /> Create
            </button>
            </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GymForm.propTypes = {
  addGym: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addGym})(GymForm);