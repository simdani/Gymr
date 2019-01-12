import React, {Component} from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BackButton from '../../components/common/BackButton';
import { editGym, getGym } from '../../state-management/actions/gymActions';

import { NotificationManager} from 'react-notifications';
import LoadingSpinner from '../../components/common/LoadingSpinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';


class GymEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      city: '',
      description: '',
      website: '',
      completed: false,
      image: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated || this.props.auth.user.role !== 'ADMIN') {
      this.props.history.push('/');
    }
    else {
      this.props.getGym(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (nextProps.gym) {
      this.setState({
        name: nextProps.gym.gym.name,
        city: nextProps.gym.gym.city,
        description: nextProps.gym.gym.description,
        website: nextProps.gym.gym.website,
        image: nextProps.gym.gym.image
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newGym = {
      name: this.state.name,
      city: this.state.city,
      description: this.state.description,
      website: this.state.website
    };

    this.props.editGym(this.props.gym.gym._id, newGym, this.props.history);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
              {this.state.errors.name && <div className="invalid-feedback d-block">{this.state.errors.name}</div>}
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
              {this.state.errors.city && <div className="invalid-feedback d-block">{this.state.errors.city}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                className="form-control"
                placeholder="enter your description"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
              />
              {this.state.errors.description && <div className="invalid-feedback d-block">{this.state.errors.description}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="website">Website:</label>
              <input type="text"
                className="form-control"
                placeholder="website"
                name="website"
                value={this.state.website}
                onChange={this.onChange}
              />
              {this.state.errors.website && <div className="invalid-feedback d-block">{this.state.errors.website}</div>}
            </div>

              {this.state.image &&
              <div className="form-group">
                <img src={this.state.image} alt={this.state.name}/>
              </div>
              }

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
  errors: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  getGym: id => {
    dispatch(getGym(id));
  },
  editGym: (id, newGym, history) => {
    dispatch(editGym(id, newGym, () => {
      history.push(`/gyms/${id}`);
      NotificationManager.success('Gym updated successfully!', 'Success');
    }));
  }
});

const mapStateToProps = state => ({
  auth: state.auth,
  gym: state.gym,
  errors: state.errors
});

export default connect(mapStateToProps, mapDispatchToProps)(GymEditForm);
