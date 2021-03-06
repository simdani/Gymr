import React, {Component} from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BackButton from '../../components/common/BackButton';
import { addGym } from '../../state-management/actions/gymActions';

import { NotificationManager} from 'react-notifications';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import ImageUploader from 'react-images-upload';

class GymForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: null,
      name: '',
      city: '',
      description: '',
      website: '',
      completed: false,
      errors: {}
    };

    this.data = null;
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

  onDrop = (picture) => {
    if (!picture[0]) {
      this.data = null;
    } else {
      this.data = new FormData();
      this.data.append('image', picture[0]);
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newGym = {
      name: this.state.name,
      city: this.state.city,
      description: this.state.description,
      website: this.state.website
    };

    this.props.addGym(newGym, this.data, this.props.history);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

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

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                className="form-control"
                placeholder="enter your description"
                name="description"
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
                onChange={this.onChange}
              />
              {this.state.errors.website && <div className="invalid-feedback d-block">{this.state.errors.website}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="image">Gym photo (optional):</label>
              <ImageUploader
                singleImage={true}
                name="image"
                withIcon={true}
                withPreview={true}
                buttonText='Choose image'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
              />
              {this.state.errors.image && <div className="invalid-feedback d-block">{this.state.errors.image}</div>}
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

const mapDispatchToProps = dispatch => ({
  addGym: (newGym, data ,history) => {
    dispatch(addGym(newGym, data, () => {
      history.push('/');
      NotificationManager.success('Gym created successfully!', 'Success');
    }));
  }
});

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, mapDispatchToProps)(GymForm);
