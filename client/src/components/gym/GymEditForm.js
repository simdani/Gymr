import React, {Component} from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BackButton from '../common/BackButton';
import { editGym, getGym } from '../../actions/gymActions';

import { NotificationManager} from 'react-notifications';
import LoadingSpinner from '../common/LoadingSpinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';


class GymEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      city: '',
      completed: false
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    else {
      this.props.getGym(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gym) {
      this.setState({
        name: nextProps.gym.gym.name,
        city: nextProps.gym.gym.city
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    
    const newGym = {
      name: this.state.name,
      city: this.state.city
    };

    this.props.editGym(this.props.gym.gym._id, newGym, () => {
      this.props.history.push(`/gyms/${this.props.gym.gym._id}`);
      NotificationManager.success('Gym updated successfully!', 'Success');
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  renderEditForm(gym) {
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
            <h5 className="card-title">Edit gym</h5>
            <div className="card-body">

            <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Gym name:</label>
              <input type="text"
                className="form-control"
                placeholder="enter gym name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input type="text"
                className="form-control"
                placeholder="enter city"
                name="city"
                value={this.state.city}
                onChange={this.onChange}
              />
            </div>

            <button type="submit" className="btn btn-light">
            <FontAwesomeIcon icon={faPencilAlt} /> Update
            </button>
            </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { gym, loading } = this.props.gym;

    return (
      <div>
        {loading || gym === null || Object.keys(gym).length === 0 ? <LoadingSpinner/> : this.renderEditForm(gym) } 
      </div>
    );
  }
}

GymEditForm.propTypes = {
  editGym: PropTypes.func.isRequired,
  getGym: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  gym: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  gym: state.gym
});

export default connect(mapStateToProps, { editGym, getGym})(GymEditForm);