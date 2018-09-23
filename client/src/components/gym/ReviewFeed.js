import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ReviewFeed extends Component {
  render() {
    const { reviews } = this.props;

    return reviews.map(review => 
      <div key={review._id} className="card card-info">
      <div className="card-body">
        <p><strong>{review.username} ({review.date})</strong></p>
        <p>{review.text}</p>
        
      </div>
      </div>
      );
  }
}

ReviewFeed.propTypes = {
  reviews: PropTypes.array.isRequired
};

export default ReviewFeed;
