import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap4-modal';
import { updateReview, deleteReview } from '../../actions/gymActions';
import { NotificationManager} from 'react-notifications';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

class ReviewFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      reviewId: '',
      showModal: false,
      errors: {}
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  removeReview = (e, gymId, reviewId) => {
    e.preventDefault();

    this.props.deleteReview(gymId, reviewId);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { gymId } = this.props;
    
    const updateReview = {
      text: this.state.text
    };

    this.props.updateReview(updateReview, gymId, this.state.reviewId, () => {
      this.setState({
        showModal: false
      });
      NotificationManager.success('Review updated successfully!', 'Success');
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  showEditModal = () => {
    return (
      <Modal visible={this.state.showModal} onClickBackdrop={this.toggleModal}>
        <div className="modal-header">
          <h5 className="modal-title">Edit your review</h5>
        </div>
        <form onSubmit={this.onSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="text">Your review:</label>
                <input type="text"
                  className="form-control"
                  placeholder="enter your review"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                />
                {this.state.errors.text && <div className="invalid-feedback d-block">{this.state.errors.text}</div>}
              </div>
            </div>

            <div className="modal-footer">        
              <button type="submit" className="btn btn-secondary">
                  Update
              </button>
            </div>
          </form>
      </Modal>
    );
  }

  render() {
    const { reviews, gymId } = this.props;

    const { user } = this.props.auth;

    return reviews.map(review => 
      <div key={review._id} className="card card-info">
        <div className="card-body bg-darker">
          <div className="d-flex">  
            <p><strong>{review.username} ({review.date})</strong></p>  
            
            { review.user === user.id ? 
              <p className="ml-auto">
                <button onClick={() => this.setState({text: review.text, reviewId: review._id, showModal: true})} className="btn btn-light mr-1">
                <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button className="btn btn-danger" onClick={(e) => this.removeReview(e, gymId, review._id)}>
                <FontAwesomeIcon icon={faTrash} />  Delete
                </button>
                

              </p>
              : (null)
              
            }
          </div>   
          { this.showEditModal() }
          
          <p>{review.text}</p>
        </div>
      </div>
      );
  }
}

ReviewFeed.propTypes = {
  reviews: PropTypes.array.isRequired,
  gymId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { deleteReview, updateReview })(ReviewFeed);
