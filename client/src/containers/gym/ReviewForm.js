import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addReview } from '../../state-management/actions/gymActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { user } = this.props.auth;
    const { gymId } = this.props;

    const newReview = {
      text: this.state.text,
      username: user.username
    };

    this.props.addReview(gymId, newReview);
    this.setState({ text: '' });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
        <div className="card card-info">
          <div className="card-header bg-light text-white">
            Post your review
          </div>
          <div className="card-body bg-darker">
            <form onSubmit={this.onSubmit}>

            <div className="form-group">
              <input type="text"
                className="form-control"
                value={this.state.text}
                placeholder="write your review.."
                name="text"
                onChange={this.onChange}
              />
              {this.state.errors.text && <div className="invalid-feedback d-block">{this.state.errors.text}</div>}
            </div>
              <button type="submit" className="btn btn-light">
              <FontAwesomeIcon icon={faPencilAlt} /> Post
              </button>
            </form>
          </div>
        </div>
    );
  }
}

ReviewForm.propTypes = {
  addReview: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  gymId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  addReview: (gymId, newReview) => {
    dispatch(addReview(gymId, newReview));
  }
});

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
