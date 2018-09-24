import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteReview } from '../../actions/gymActions';

class ReviewFeed extends Component {

  removeReview = (e, gymId, reviewId) => {
    e.preventDefault();

    this.props.deleteReview(gymId, reviewId);
  }

  render() {
    const { reviews, gymId } = this.props;

    return reviews.map(review => 
      <div key={review._id} className="card card-info">
      <div className="card-body">
        <div className="d-flex">  
          <p><strong>{review.username} ({review.date})</strong></p>  
          <p className="ml-auto">
            <button onClick={(e) => this.removeReview(e, gymId, review._id)}>
              Delete
            </button>  
          </p>
        </div>   
        <p>{review.text}</p>
           
      </div>
      </div>
      );
  }
}

ReviewFeed.propTypes = {
  reviews: PropTypes.array.isRequired,
  gymId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteReview })(ReviewFeed);
